-- OpenCLI Hub - Complete Database Schema
-- Run this SQL in Supabase SQL Editor for a fresh deployment.

-- 1. Create cli_tools table
CREATE TABLE IF NOT EXISTS cli_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  github_url text,
  homepage_url text,
  icon_url text,
  maintainer_type text NOT NULL CHECK (maintainer_type IN ('official', 'community')),
  maintainer_name text,
  primary_language text,
  stars integer DEFAULT 0,
  category text,
  install_command text,
  agent_install_command text,
  sort_order integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_cli_tools_maintainer_type ON cli_tools(maintainer_type);
CREATE INDEX IF NOT EXISTS idx_cli_tools_category ON cli_tools(category);
CREATE INDEX IF NOT EXISTS idx_cli_tools_stars ON cli_tools(stars DESC);

-- 3. Enable RLS
ALTER TABLE cli_tools ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies (scoped to anon role for Supabase client access)
CREATE POLICY "Allow anon select" ON cli_tools FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert" ON cli_tools FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update" ON cli_tools FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete" ON cli_tools FOR DELETE TO anon USING (true);

-- 5. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cli_tools_updated_at
  BEFORE UPDATE ON cli_tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
