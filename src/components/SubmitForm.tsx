"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface FormData {
  name: string;
  github_url: string;
  description: string;
  maintainer_type: "official" | "community";
  maintainer_name: string;
  primary_language: string;
  category: string;
  homepage_url: string;
  install_command: string;
}

const initialForm: FormData = {
  name: "",
  github_url: "",
  description: "",
  maintainer_type: "community",
  maintainer_name: "",
  primary_language: "",
  category: "",
  homepage_url: "",
  install_command: "",
};

export function SubmitForm() {
  const { t } = useI18n();
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || t("submit.error"));
        setStatus("error");
      }
    } catch {
      setErrorMsg(t("submit.error"));
      setStatus("error");
    }
  };

  const apiExample = `curl -X POST ${typeof window !== "undefined" ? window.location.origin : "https://openclihub.vercel.app"}/api/tools \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Notion CLI",
    "github_url": "https://github.com/notion/cli",
    "description": "Official CLI for Notion",
    "maintainer_type": "official",
    "maintainer_name": "Notion",
    "primary_language": "TypeScript",
    "category": "Productivity"
  }'`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
        {t("submit.title")}
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-10">
        {t("submit.subtitle")}
      </p>

      {/* API Section */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          {t("submit.apiTitle")}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
          {t("submit.apiDesc")}
        </p>
        <div className="p-4 rounded-lg bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 overflow-x-auto">
          <pre className="text-sm text-green-400 font-mono whitespace-pre">
            {apiExample}
          </pre>
        </div>
      </div>

      {/* Form Section */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
          {t("submit.formTitle")}
        </h2>

        {status === "success" && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm">
            {t("submit.success")}
          </div>
        )}

        {status === "error" && errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <Field label={t("submit.name")} required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder={t("submit.namePlaceholder")}
              required
              className="input-field"
            />
          </Field>

          {/* GitHub URL */}
          <Field label={t("submit.githubUrl")} required>
            <input
              type="url"
              value={form.github_url}
              onChange={(e) => update("github_url", e.target.value)}
              placeholder={t("submit.githubUrlPlaceholder")}
              required
              className="input-field"
            />
          </Field>

          {/* Description */}
          <Field label={t("submit.description")}>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder={t("submit.descriptionPlaceholder")}
              rows={3}
              className="input-field resize-none"
            />
          </Field>

          {/* Maintainer Type */}
          <Field label={t("submit.maintainerType")} required>
            <div className="flex gap-3">
              {(["official", "community"] as const).map((type) => (
                <label
                  key={type}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                    form.maintainer_type === type
                      ? type === "official"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                        : "border-sky-500 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="maintainer_type"
                    value={type}
                    checked={form.maintainer_type === type}
                    onChange={(e) => update("maintainer_type", e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium capitalize">{type}</span>
                </label>
              ))}
            </div>
          </Field>

          {/* Two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label={t("submit.maintainerName")}>
              <input
                type="text"
                value={form.maintainer_name}
                onChange={(e) => update("maintainer_name", e.target.value)}
                placeholder={t("submit.maintainerNamePlaceholder")}
                className="input-field"
              />
            </Field>
            <Field label={t("submit.language")}>
              <input
                type="text"
                value={form.primary_language}
                onChange={(e) => update("primary_language", e.target.value)}
                placeholder={t("submit.languagePlaceholder")}
                className="input-field"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label={t("submit.category")}>
              <input
                type="text"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                placeholder={t("submit.categoryPlaceholder")}
                className="input-field"
              />
            </Field>
            <Field label={t("submit.homepageUrl")}>
              <input
                type="url"
                value={form.homepage_url}
                onChange={(e) => update("homepage_url", e.target.value)}
                placeholder={t("submit.homepageUrlPlaceholder")}
                className="input-field"
              />
            </Field>
          </div>

          {/* Install command */}
          <Field label={t("submit.installCommand")}>
            <input
              type="text"
              value={form.install_command}
              onChange={(e) => update("install_command", e.target.value)}
              placeholder={t("submit.installCommandPlaceholder")}
              className="input-field font-mono"
            />
          </Field>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium text-sm transition-colors"
          >
            {status === "loading" ? t("submit.submitting") : t("submit.button")}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
