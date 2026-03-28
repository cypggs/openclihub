"use client";

import { CliTool } from "@/lib/types";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ToolBrowser } from "./ToolBrowser";
import { Footer } from "./Footer";

export function HomePage({ tools }: { tools: CliTool[] }) {
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
