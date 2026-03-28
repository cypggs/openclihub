"use client";

import Link from "next/link";
import Image from "next/image";
import { CliTool } from "@/lib/types";
import { formatStars } from "@/lib/utils";
import { Badge } from "./Badge";

function StarIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function ToolCard({ tool }: { tool: CliTool }) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg dark:hover:shadow-zinc-900/50 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
          {tool.icon_url ? (
            <Image
              src={tool.icon_url}
              alt={tool.name}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          ) : (
            <span className="text-lg font-bold text-zinc-400">
              {tool.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors truncate">
              {tool.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge variant={tool.maintainer_type} />
            {tool.primary_language && (
              <Badge variant="language">{tool.primary_language}</Badge>
            )}
            {tool.category && (
              <Badge variant="category">{tool.category}</Badge>
            )}
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
            {tool.description}
          </p>

          <div className="flex items-center justify-between">
            {tool.github_url && tool.stars > 0 ? (
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                <StarIcon />
                <span className="text-sm font-medium">
                  {formatStars(tool.stars)}
                </span>
              </div>
            ) : (
              <div />
            )}
            {tool.maintainer_name && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                by {tool.maintainer_name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
