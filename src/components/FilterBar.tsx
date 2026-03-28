"use client";

import { useI18n } from "@/lib/i18n";
import { TranslationKey } from "@/lib/i18n";

export type FilterType = "all" | "official" | "community";

interface FilterBarProps {
  active: FilterType;
  onChange: (filter: FilterType) => void;
  counts: { all: number; official: number; community: number };
}

const filters: { value: FilterType; labelKey: TranslationKey }[] = [
  { value: "all", labelKey: "filter.all" },
  { value: "official", labelKey: "filter.official" },
  { value: "community", labelKey: "filter.community" },
];

export function FilterBar({ active, onChange, counts }: FilterBarProps) {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-center gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            active === f.value
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          {t(f.labelKey)}
          <span className="ml-1.5 text-xs opacity-60">
            {counts[f.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
