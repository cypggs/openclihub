"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          {t("footer.mission")}
        </p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <a
            href="https://github.com/cypggs/openclihub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            {t("footer.openSource")}
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <Link
            href="/submit"
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            {t("footer.submitTool")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
