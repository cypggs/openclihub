import { supabase } from "@/lib/supabase";
import { CliTool } from "@/lib/types";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolBrowser } from "@/components/ToolBrowser";
import { Footer } from "@/components/Footer";

export const revalidate = 3600;

async function getTools(): Promise<CliTool[]> {
  const { data, error } = await supabase
    .from("cli_tools")
    .select("*")
    .order("stars", { ascending: false });

  if (error) {
    console.error("Failed to fetch tools:", error);
    return [];
  }

  return data as CliTool[];
}

export default async function Home() {
  const tools = await getTools();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ToolBrowser tools={tools} />
      </main>
      <Footer />
    </div>
  );
}
