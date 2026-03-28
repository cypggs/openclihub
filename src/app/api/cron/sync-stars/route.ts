import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";

/**
 * GET /api/cron/sync-stars
 * Called by Vercel Cron daily at 08:00 UTC.
 * Vercel automatically validates the CRON_SECRET header.
 * Can also be triggered manually with API key via POST /api/sync-stars.
 */
export async function GET(request: NextRequest) {
  // Vercel Cron sends Authorization header with CRON_SECRET
  // In production, Vercel validates this automatically
  // For extra safety, also check our own secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const apiKey = process.env.OPENCLIHUB_API_KEY;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: tools, error } = await supabaseServer
    .from("cli_tools")
    .select("slug, github_url, stars");

  if (error || !tools) {
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }

  const results: {
    slug: string;
    stars: number;
    previous: number;
    error?: string;
  }[] = [];

  for (const tool of tools) {
    // Skip tools without GitHub URLs
    if (!tool.github_url) {
      results.push({
        slug: tool.slug,
        stars: tool.stars,
        previous: tool.stars,
      });
      continue;
    }

    const match = tool.github_url.match(/github\.com\/([^/]+\/[^/]+)/);
    const repoPath = match ? match[1].replace(/\.git$/, "") : null;

    if (!repoPath) {
      results.push({
        slug: tool.slug,
        stars: tool.stars,
        previous: tool.stars,
        error: "Invalid GitHub URL",
      });
      continue;
    }

    try {
      const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "OpenCLI-Hub",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        results.push({
          slug: tool.slug,
          stars: tool.stars,
          previous: tool.stars,
          error: `GitHub API ${res.status}`,
        });
        continue;
      }

      const repo = await res.json();
      const newStars = repo.stargazers_count;

      if (newStars !== tool.stars) {
        await supabaseServer
          .from("cli_tools")
          .update({ stars: newStars })
          .eq("slug", tool.slug);
      }

      results.push({
        slug: tool.slug,
        stars: newStars,
        previous: tool.stars,
      });
    } catch (err) {
      results.push({
        slug: tool.slug,
        stars: tool.stars,
        previous: tool.stars,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  revalidatePath("/");

  const changed = results.filter((r) => r.stars !== r.previous && !r.error);

  return NextResponse.json({
    ok: true,
    total: results.length,
    changed: changed.length,
    updated: results,
  });
}
