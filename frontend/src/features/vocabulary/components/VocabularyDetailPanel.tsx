import { X, Volume2 } from "lucide-react";
import { VocabularyItem } from "../types/vocabulary_types";

interface Props {
  item: VocabularyItem | null;
  onClose?: () => void;
}

export function VocabularyDetailPanel({ item, onClose }: Props) {
  if (!item) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Chọn 1 từ để xem chi tiết
      </div>
    );
  }

  function speak() {
    const utter = new SpeechSynthesisUtterance(item!.word);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <div className="mb-3 flex items-start justify-between">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Chi tiết từ vựng
        </p>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <h2 className="font-heading text-2xl font-bold text-foreground">{item.word}</h2>
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
          {item.type}
        </span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
        {item.ipa}
        <button onClick={speak} className="text-primary" aria-label="Phát âm">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          Định nghĩa & Dịch nghĩa
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground">{item.definition}</p>
      </div>

      <div className="mt-4 rounded-lg bg-muted/60 p-3">
        <p className="text-xs font-semibold uppercase text-muted-foreground">Ví dụ thực tế</p>
        <p className="mt-1 text-sm italic text-foreground">&ldquo;{item.exampleEn}&rdquo;</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.exampleVi}</p>
      </div>
    </div>
  );
}