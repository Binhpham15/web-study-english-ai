"use client";

import { useEffect, useState } from "react";
import { searchVocabularyMock } from "../api/vocabulary_mock";
import { VocabularyFilters, VocabularyItem } from "../types/vocabulary_types";

export function useVocabularySearch() {
  const [filters, setFilters] = useState<VocabularyFilters>({
    query: "",
    topic: "all",
    level: "all",
  });
  const [results, setResults] = useState<VocabularyItem[]>([]);
  const [selected, setSelected] = useState<VocabularyItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsLoading(true); // OK: set trước await đầu tiên trong async function, ESLint không báo lỗi

      await new Promise((resolve) => setTimeout(resolve, 300));
      if (cancelled) return;

      const data = await searchVocabularyMock(filters);
      if (cancelled) return;

      setResults(data);
      setIsLoading(false);
      setSelected((prev) => prev ?? (data.length > 0 ? data[0] : null));
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [filters]);

  return { filters, setFilters, results, selected, setSelected, isLoading };
}