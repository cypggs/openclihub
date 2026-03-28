import { supabase } from "@/lib/supabase";
import { CliTool } from "@/lib/types";
import { HomePage } from "@/components/HomePage";

export const revalidate = 3600;

async function getTools(): Promise<CliTool[]> {
  const { data, error } = await supabase
    .from("cli_tools")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("stars", { ascending: false });

  if (error) {
    console.error("Failed to fetch tools:", error);
    return [];
  }

  return data as CliTool[];
}

export default async function Page() {
  const tools = await getTools();

  return <HomePage tools={tools} />;
}
