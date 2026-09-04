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
    setIsLoading(true);

    const timer = setTimeout(async () => {
      const data = await searchVocabularyMock(filters);
      if (!cancelled) {
        setResults(data);
        setIsLoading(false);
        if (!selected && data.length > 0) setSelected(data[0]);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filters]);

  return { filters, setFilters, results, selected, setSelected, isLoading };
}