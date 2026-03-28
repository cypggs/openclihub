"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CliTool } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { formatStars } from "@/lib/utils";
import { Badge } from "./Badge";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
    >
      {copied ? t("detail.copied") : t("detail.copy")}
    </button>
  );
}

export function ToolDetail({ tool }: { tool: CliTool }) {
  const { t } = useI18n();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        {t("detail.backToList")}
      </Link>

      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
          {tool.icon_url ? (
            <Image
              src={tool.icon_url}
              alt={tool.name}
              width={40}
              height={40}
              className="w-10 h-10"
            />
          ) : (
            <span className="text-2xl font-bold text-zinc-400">
              {tool.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            {tool.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={tool.maintainer_type} />
            {tool.primary_language && (
              <Badge variant="language">{tool.primary_language}</Badge>
            )}
            {tool.category && (
              <Badge variant="category">{tool.category}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {tool.description && (
        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
          {tool.description}
        </p>
      )}

      {/* Install command */}
      {tool.install_command && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            {t("detail.installCommand")}
          </h2>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-950 dark:bg-zinc-900 border border-zinc-800">
            <code className="flex-1 text-sm text-green-400 font-mono overflow-x-auto">
              $ {tool.install_command}
            </code>
            <CopyButton text={tool.install_command} />
          </div>
        </div>
      )}

      {/* Agent install command */}
      {tool.agent_install_command && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            {t("detail.agentInstallCommand")}
          </h2>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-950 dark:bg-zinc-900 border border-zinc-800">
            <code className="flex-1 text-sm text-blue-400 font-mono overflow-x-auto whitespace-pre-wrap break-all">
              {tool.agent_install_command}
            </code>
            <CopyButton text={tool.agent_install_command} />
          </div>
        </div>
      )}

      {/* Info grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {tool.github_url && tool.stars > 0 && (
          <InfoItem label={t("detail.stars")} value={formatStars(tool.stars)} />
        )}
        {tool.maintainer_name && (
          <InfoItem label={t("detail.maintainer")} value={tool.maintainer_name} />
        )}
        {tool.primary_language && (
          <InfoItem label={t("detail.language")} value={tool.primary_language} />
        )}
        {tool.category && (
          <InfoItem label={t("detail.category")} value={tool.category} />
        )}
        <InfoItem
          label={t("detail.type")}
          value={
            tool.maintainer_type === "official"
              ? t("tool.officialBadge")
              : t("tool.communityBadge")
          }
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {tool.github_url && (
          <a
            href={tool.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {t("detail.github")}
          </a>
        )}
        {tool.homepage_url && (
          <a
            href={tool.homepage_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${tool.github_url ? "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800" : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            {t("detail.homepage")}
          </a>
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
      <div className="text-xs text-zinc-500 dark:text-zinc-500 mb-1">
        {label}
      </div>
      <div className="text-sm font-medium text-zinc-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}
