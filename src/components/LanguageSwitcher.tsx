"use client";

import { useI18n, Locale } from "@/lib/i18n";

const locales: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {locales.map((l) => (
        <button
          key={l.value}
          onClick={() => setLocale(l.value)}
          className={`px-2.5 py-1 text-xs font-medium transition-colors ${
            locale === l.value
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
