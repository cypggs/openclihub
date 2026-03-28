import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/tools/:slug
 * Get a single CLI tool by slug (public, no auth required).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabaseServer
    .from("cli_tools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Tool not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data });
}

/**
 * PATCH /api/tools/:slug
 * Update a CLI tool. Requires API key. Accepts partial updates.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Auth check
  const authError = requireAuth(request);
  if (authError) return authError;

  const { slug } = await params;

  try {
    const body = await request.json();

    // Only allow updating specific fields
    const allowedFields = [
      "name",
      "description",
      "github_url",
      "homepage_url",
      "icon_url",
      "maintainer_type",
      "maintainer_name",
      "primary_language",
      "stars",
      "category",
      "install_command",
      "agent_install_command",
      "sort_order",
    ];

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in body) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    // Validate maintainer_type if provided
    if (
      updates.maintainer_type &&
      !["official", "community"].includes(updates.maintainer_type as string)
    ) {
      return NextResponse.json(
        { error: 'maintainer_type must be "official" or "community"' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("cli_tools")
      .update(updates)
      .eq("slug", slug)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Tool not found or update failed" },
        { status: 404 }
      );
    }

    // Revalidate pages
    revalidatePath("/");
    revalidatePath(`/tool/${slug}`);

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/tools/:slug
 * Delete a CLI tool. Requires API key.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Auth check
  const authError = requireAuth(request);
  if (authError) return authError;

  const { slug } = await params;

  const { error } = await supabaseServer
    .from("cli_tools")
    .delete()
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Revalidate homepage
  revalidatePath("/");

  return NextResponse.json({ success: true });
}
