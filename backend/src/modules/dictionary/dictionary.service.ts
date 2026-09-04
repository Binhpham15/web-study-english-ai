import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DictionaryStatus, Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

export type Pronunciation = {
  term: string;
  phoneticText: string | null;
  audioUrl: string | null;
  definitions: { partOfSpeech: string; definition: string }[];
  source: 'cache' | 'dictionaryapi.dev' | 'fallback';
  available: boolean;
};

type ApiPhonetic = { text?: string; audio?: string };
type ApiMeaning = { partOfSpeech?: string; definitions?: { definition?: string }[] };
type ApiEntry = {
  word?: string;
  phonetic?: string;
  phonetics?: ApiPhonetic[];
  meanings?: ApiMeaning[];
};

@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async lookup(rawTerm: string, fallbackIpa?: string | null): Promise<Pronunciation> {
    const term = rawTerm.trim().toLowerCase();

    const cached = await this.prisma.dictionaryEntry.findUnique({ where: { term } });
    if (cached && this.isCacheUsable(cached)) {
      return this.toPronunciation(term, cached, 'cache', fallbackIpa);
    }

    const fetched = await this.fetchFromApi(term);

    if (fetched === null) {
      // Dịch vụ lỗi: KHÔNG ghi cache, trả phiên âm sẵn có để giao diện vẫn hiển thị được
      return {
        term,
        phoneticText: fallbackIpa ?? null,
        audioUrl: null,
        definitions: [],
        source: 'fallback',
        available: false,
      };
    }

    const saved = await this.prisma.dictionaryEntry.upsert({
      where: { term },
      create: { term, ...fetched },
      update: { ...fetched, fetchedAt: new Date() },
    });

    return this.toPronunciation(term, saved, 'dictionaryapi.dev', fallbackIpa);
  }

  private isCacheUsable(entry: { status: DictionaryStatus; fetchedAt: Date }): boolean {
    if (entry.status === DictionaryStatus.FOUND) return true;

    const days = Number(this.config.get('DICTIONARY_NEGATIVE_CACHE_DAYS') ?? 7);
    return Date.now() - entry.fetchedAt.getTime() < days * 24 * 60 * 60 * 1000;
  }

  /** Trả dữ liệu để lưu, hoặc null khi dịch vụ lỗi (phân biệt với "tra không thấy") */
  private async fetchFromApi(term: string) {
    const baseUrl = this.config.get<string>('DICTIONARY_API_URL');
    const timeoutMs = Number(this.config.get('DICTIONARY_TIMEOUT_MS') ?? 3000);

    try {
      const response = await fetch(`${baseUrl}/${encodeURIComponent(term)}`, {
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (response.status === 404) {
        return {
          phoneticText: null,
          audioUrl: null,
          definitions: Prisma.JsonNull,
          status: DictionaryStatus.NOT_FOUND,
        };
      }

      if (!response.ok) {
        this.logger.warn(`Từ điển trả mã ${response.status} cho từ "${term}"`);
        return null;
      }

      const entries = (await response.json()) as ApiEntry[];
      const entry = entries?.[0];
      if (!entry) return null;

      return {
        phoneticText: this.pickPhoneticText(entry),
        audioUrl: this.pickAudioUrl(entry),
        definitions: this.pickDefinitions(entry) as Prisma.InputJsonValue,
        status: DictionaryStatus.FOUND,
      };
    } catch (error) {
      this.logger.warn(`Không gọi được dịch vụ từ điển cho "${term}": ${String(error)}`);
      return null;
    }
  }

  private pickPhoneticText(entry: ApiEntry): string | null {
    if (entry.phonetic) return entry.phonetic;
    return entry.phonetics?.find((p) => p.text)?.text ?? null;
  }

  private pickAudioUrl(entry: ApiEntry): string | null {
    // Phần tử đầu thường có audio rỗng -> phải tìm phần tử đầu tiên CÓ audio
    return entry.phonetics?.find((p) => p.audio && p.audio.length > 0)?.audio ?? null;
  }

  private pickDefinitions(entry: ApiEntry) {
    return (entry.meanings ?? [])
      .slice(0, 3)
      .map((m) => ({
        partOfSpeech: m.partOfSpeech ?? '',
        definition: m.definitions?.[0]?.definition ?? '',
      }))
      .filter((d) => d.definition);
  }

  private toPronunciation(
    term: string,
    entry: {
      phoneticText: string | null;
      audioUrl: string | null;
      definitions: unknown;
      status: DictionaryStatus;
    },
    source: 'cache' | 'dictionaryapi.dev',
    fallbackIpa?: string | null,
  ): Pronunciation {
    const found = entry.status === DictionaryStatus.FOUND;

    return {
      term,
      phoneticText: entry.phoneticText ?? fallbackIpa ?? null,
      audioUrl: entry.audioUrl,
      definitions: found ? ((entry.definitions ?? []) as Pronunciation['definitions']) : [],
      source,
      available: found,
    };
  }
}
