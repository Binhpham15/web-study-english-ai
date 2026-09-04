import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/prisma/prisma.service';
import { DictionaryService } from './dictionary.service';

const prismaMock = {
  dictionaryEntry: { findUnique: vi.fn(), upsert: vi.fn() },
};

const configMock = {
  get: vi.fn((key: string) => {
    const values: Record<string, string> = {
      DICTIONARY_API_URL: 'https://api.dictionaryapi.dev/api/v2/entries/en',
      DICTIONARY_TIMEOUT_MS: '3000',
      DICTIONARY_NEGATIVE_CACHE_DAYS: '7',
    };
    return values[key];
  }),
};

const apiResponse = [
  {
    word: 'book',
    phonetic: '/bʊk/',
    phonetics: [
      { text: '/bʊk/', audio: '' },
      { text: '/bʊk/', audio: 'https://media/book-us.mp3' },
    ],
    meanings: [{ partOfSpeech: 'noun', definitions: [{ definition: 'A written work' }] }],
  },
];

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DictionaryService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: ConfigService, useValue: configMock },
      ],
    }).compile();

    service = module.get<DictionaryService>(DictionaryService);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('dùng cache và KHÔNG gọi mạng khi đã có dữ liệu', async () => {
    prismaMock.dictionaryEntry.findUnique.mockResolvedValue({
      term: 'book',
      phoneticText: '/bʊk/',
      audioUrl: 'https://media/book-us.mp3',
      definitions: [],
      status: 'FOUND',
      fetchedAt: new Date(),
    });

    const result = await service.lookup('Book');

    expect(fetch).not.toHaveBeenCalled();
    expect(result.source).toBe('cache');
    expect(result.term).toBe('book');
  });

  it('lấy audio đầu tiên khác rỗng, bỏ qua phần tử audio rỗng', async () => {
    prismaMock.dictionaryEntry.findUnique.mockResolvedValue(null);
    (fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(apiResponse),
    });
    prismaMock.dictionaryEntry.upsert.mockImplementation(({ create }: any) => ({
      ...create,
      status: 'FOUND',
    }));

    const result = await service.lookup('book');

    expect(result.audioUrl).toBe('https://media/book-us.mp3');
    expect(result.available).toBe(true);
  });

  it('ghi cache trạng thái NOT_FOUND khi API trả 404', async () => {
    prismaMock.dictionaryEntry.findUnique.mockResolvedValue(null);
    (fetch as any).mockResolvedValue({ ok: false, status: 404, json: () => Promise.resolve({}) });
    prismaMock.dictionaryEntry.upsert.mockImplementation(({ create }: any) => create);

    const result = await service.lookup('zzzzqq');

    expect(prismaMock.dictionaryEntry.upsert).toHaveBeenCalled();
    expect(result.available).toBe(false);
  });

  it('trả fallback IPA và KHÔNG ghi cache khi dịch vụ lỗi', async () => {
    prismaMock.dictionaryEntry.findUnique.mockResolvedValue(null);
    (fetch as any).mockRejectedValue(new Error('timeout'));

    const result = await service.lookup('book', '/bˈʊk/');

    expect(result.source).toBe('fallback');
    expect(result.phoneticText).toBe('/bˈʊk/');
    expect(result.audioUrl).toBeNull();
    expect(prismaMock.dictionaryEntry.upsert).not.toHaveBeenCalled();
  });

  it('gọi lại API khi cache NOT_FOUND đã quá 7 ngày', async () => {
    const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    prismaMock.dictionaryEntry.findUnique.mockResolvedValue({
      term: 'book',
      phoneticText: null,
      audioUrl: null,
      definitions: null,
      status: 'NOT_FOUND',
      fetchedAt: eightDaysAgo,
    });
    (fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(apiResponse),
    });
    prismaMock.dictionaryEntry.upsert.mockImplementation(({ create }: any) => ({
      ...create,
      status: 'FOUND',
    }));

    await service.lookup('book');

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
