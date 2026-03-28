"use client";

import { useState, useMemo } from "react";
import { CliTool } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { SearchBar } from "./SearchBar";
import { FilterBar, FilterType } from "./FilterBar";
import { ToolCard } from "./ToolCard";

export function ToolBrowser({ tools }: { tools: CliTool[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const { t } = useI18n();

  const filtered = useMemo(() => {
    let result = tools;

    if (filter !== "all") {
      result = result.filter((t) => t.maintainer_type === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.maintainer_name?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q) ||
          t.primary_language?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [tools, search, filter]);

  const counts = useMemo(
    () => ({
      all: tools.length,
      official: tools.filter((t) => t.maintainer_type === "official").length,
      community: tools.filter((t) => t.maintainer_type === "community").length,
    }),
    [tools]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="space-y-6 mb-10">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar active={filter} onChange={setFilter} counts={counts} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">:/</div>
          <p className="text-zinc-500 dark:text-zinc-400">
            {t("empty.description")}
          </p>
          <button
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            className="mt-3 text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {t("empty.clearFilters")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
