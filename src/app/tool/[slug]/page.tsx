import { supabase } from "@/lib/supabase";
import { CliTool } from "@/lib/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolDetail } from "@/components/ToolDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getTool(slug: string): Promise<CliTool | null> {
  const { data, error } = await supabase
    .from("cli_tools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as CliTool;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) return { title: "Tool Not Found - OpenCLI Hub" };

  return {
    title: `${tool.name} - OpenCLI Hub`,
    description: tool.description || `${tool.name} CLI tool on OpenCLI Hub`,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ToolDetail tool={tool} />
      </main>
      <Footer />
    </div>
  );
}
