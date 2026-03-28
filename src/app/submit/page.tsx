import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SubmitForm } from "@/components/SubmitForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a CLI Tool - OpenCLI Hub",
  description:
    "Submit a CLI tool to be listed on OpenCLI Hub. Supports API submission for AI agents.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SubmitForm />
      </main>
      <Footer />
    </div>
  );
}
