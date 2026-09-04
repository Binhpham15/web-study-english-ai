"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { searchVocabularyMock } from "../api/vocabulary_mock";
import { VocabularyFilters, VocabularyItem } from "../types/vocabulary_types";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";

export function useVocabularySearch() {
  const [filters, setFilters] = useState<VocabularyFilters>({
    query: "",
    topic: "all",
    level: "all",
  });
  const [selected, setSelected] = useState<VocabularyItem | null>(null);

  const debouncedFilters = useDebouncedValue(filters, 300);

  const {
    data: results = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vocabulary", debouncedFilters],
    queryFn: () => searchVocabularyMock(debouncedFilters),
    placeholderData: keepPreviousData, // giữ kết quả cũ hiện trên màn hình trong lúc chờ kết quả mới, đỡ giật UI
    staleTime: 5 * 60 * 1000, // theo bảng bước 3: từ điển ít đổi
  });

  // thay cho setSelected(prev => prev ?? data[0]) trong effect cũ:
  // tính trực tiếp lúc render, không cần effect
  const effectiveSelected = selected ?? results[0] ?? null;

  return {
    filters,
    setFilters,
    results,
    selected: effectiveSelected,
    setSelected,
    isLoading,
    isError,
    error,
    refetch,
  };
}