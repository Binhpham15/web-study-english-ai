"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VocabularyFilters } from "../types/vocabulary_types";

interface Props {
  filters: VocabularyFilters;
  onChange: (filters: VocabularyFilters) => void;
}

const TOPICS = ["Giao tiếp", "Công việc", "Du lịch", "Học thuật"];
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function VocabularySearchBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Tìm từ vựng..."
          className="pl-9"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
        />
      </div>

      <Select
        value={filters.topic}
        onValueChange={(v) => onChange({ ...filters, topic: v ?? "all" })}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Chủ đề" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả chủ đề</SelectItem>
          {TOPICS.map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.level}
        onValueChange={(v) => onChange({ ...filters, level: v ?? "all" })}
      >
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="Trình độ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả trình độ</SelectItem>
          {LEVELS.map((l) => (
            <SelectItem key={l} value={l}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}