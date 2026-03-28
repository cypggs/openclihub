import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";
import { requireAuth } from "@/lib/auth";

/**
 * POST /api/sync-stars
 * Fetch latest star counts from GitHub for all tools and update the database.
 * Requires API key. Designed to be called by a daily cron job.
 *
 * Example:
 *   curl -X POST https://openclihub.vercel.app/api/sync-stars \
 *     -H "Authorization: Bearer YOUR_API_KEY"
 *
 * Response:
 *   { "updated": [ { "slug": "opencli", "stars": 8300, "previous": 8245 }, ... ] }
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  // Fetch all tools from database
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

  // Fetch stars from GitHub API for each tool
  for (const tool of tools) {
    const repoPath = extractRepoPath(tool.github_url);
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
        // No cache - always fetch fresh
        cache: "no-store",
      });

      if (!res.ok) {
        results.push({
          slug: tool.slug,
          stars: tool.stars,
          previous: tool.stars,
          error: `GitHub API returned ${res.status}`,
        });
        continue;
      }

      const repo = await res.json();
      const newStars = repo.stargazers_count;

      // Update if stars changed
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

  // Revalidate homepage to reflect new star counts
  revalidatePath("/");

  const changed = results.filter((r) => r.stars !== r.previous && !r.error);
  const errors = results.filter((r) => r.error);

  return NextResponse.json({
    total: results.length,
    changed: changed.length,
    errors: errors.length,
    updated: results,
  });
}

/**
 * Extract "owner/repo" from a GitHub URL.
 * e.g. "https://github.com/googleworkspace/cli" -> "googleworkspace/cli"
 */
function extractRepoPath(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1].replace(/\.git$/, "") : null;
}
