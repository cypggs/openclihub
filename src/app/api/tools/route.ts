import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { slugify } from "@/lib/utils";

/**
 * GET /api/tools
 * List all CLI tools. Supports query params:
 *   ?type=official|community  - filter by maintainer type
 *   ?category=Productivity    - filter by category
 *   ?q=search                 - search by name/description
 *   ?limit=20                 - limit results (default 100)
 *   ?offset=0                 - pagination offset
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const limit = Math.min(Number(searchParams.get("limit") || 100), 100);
  const offset = Number(searchParams.get("offset") || 0);

  let query = supabaseServer
    .from("cli_tools")
    .select("*", { count: "exact" })
    .order("stars", { ascending: false })
    .range(offset, offset + limit - 1);

  if (type) {
    query = query.eq("maintainer_type", type);
  }
  if (category) {
    query = query.eq("category", category);
  }
  if (q) {
    query = query.or(
      `name.ilike.%${q}%,description.ilike.%${q}%,maintainer_name.ilike.%${q}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    total: count,
    limit,
    offset,
  });
}

/**
 * POST /api/tools
 * Submit a new CLI tool. Required fields: name, github_url, maintainer_type.
 *
 * Example request body:
 * {
 *   "name": "Notion CLI",
 *   "github_url": "https://github.com/notion/cli",
 *   "description": "Official CLI for Notion",
 *   "maintainer_type": "official",
 *   "maintainer_name": "Notion",
 *   "primary_language": "TypeScript",
 *   "category": "Productivity",
 *   "homepage_url": "https://notion.so",
 *   "install_command": "npm install -g @notion/cli",
 *   "icon_url": "/icons/notion.svg"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, github_url, maintainer_type } = body;
    if (!name || !github_url || !maintainer_type) {
      return NextResponse.json(
        {
          error: "Missing required fields: name, github_url, maintainer_type",
          example: {
            name: "Notion CLI",
            github_url: "https://github.com/notion/cli",
            description: "Official CLI for Notion",
            maintainer_type: "official",
            maintainer_name: "Notion",
            primary_language: "TypeScript",
            category: "Productivity",
            homepage_url: "https://notion.so",
            install_command: "npm install -g @notion/cli",
          },
        },
        { status: 400 }
      );
    }

    // Validate maintainer_type
    if (!["official", "community"].includes(maintainer_type)) {
      return NextResponse.json(
        { error: 'maintainer_type must be "official" or "community"' },
        { status: 400 }
      );
    }

    // Validate github_url format
    if (!github_url.startsWith("https://github.com/")) {
      return NextResponse.json(
        { error: "github_url must start with https://github.com/" },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = body.slug || slugify(name);

    // Check for duplicate slug
    const { data: existing } = await supabaseServer
      .from("cli_tools")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: `A tool with slug "${slug}" already exists` },
        { status: 409 }
      );
    }

    // Insert the tool
    const { data, error } = await supabaseServer
      .from("cli_tools")
      .insert({
        slug,
        name,
        description: body.description || null,
        github_url,
        homepage_url: body.homepage_url || null,
        icon_url: body.icon_url || null,
        maintainer_type,
        maintainer_name: body.maintainer_name || null,
        primary_language: body.primary_language || null,
        stars: body.stars || 0,
        category: body.category || null,
        install_command: body.install_command || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
