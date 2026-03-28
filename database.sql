-- OpenCLI Hub Database Schema

-- Create cli_tools table
CREATE TABLE IF NOT EXISTS cli_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  github_url text NOT NULL,
  homepage_url text,
  icon_url text,
  maintainer_type text NOT NULL CHECK (maintainer_type IN ('official', 'community')),
  maintainer_name text,
  primary_language text,
  stars integer DEFAULT 0,
  category text,
  install_command text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cli_tools_maintainer_type ON cli_tools(maintainer_type);
CREATE INDEX IF NOT EXISTS idx_cli_tools_category ON cli_tools(category);
CREATE INDEX IF NOT EXISTS idx_cli_tools_stars ON cli_tools(stars DESC);

-- Enable RLS
ALTER TABLE cli_tools ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access" ON cli_tools
  FOR SELECT USING (true);

-- Auto-update updated_at
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

-- Seed data
INSERT INTO cli_tools (slug, name, description, github_url, homepage_url, icon_url, maintainer_type, maintainer_name, primary_language, stars, category, install_command) VALUES
(
  'google-workspace-cli',
  'Google Workspace CLI',
  'A CLI tool for interacting with Google Workspace services including Gmail, Drive, Calendar, Docs, and Sheets. Built by Google for seamless integration with AI agents.',
  'https://github.com/googleworkspace/cli',
  'https://workspace.google.com',
  '/icons/google.svg',
  'official',
  'Google',
  'Go',
  22800,
  'Productivity',
  'go install github.com/googleworkspace/cli@latest'
),
(
  'gogcli',
  'gogcli',
  'Community-built Google CLI tool that provides a streamlined interface to interact with Google services from the command line.',
  'https://github.com/steipete/gogcli',
  NULL,
  '/icons/google.svg',
  'community',
  'Peter Steinberger',
  'TypeScript',
  6500,
  'Productivity',
  'npm install -g gogcli'
),
(
  'opencli',
  'OpenCLI',
  'A unified CLI framework that wraps multiple cloud and SaaS product APIs into a single command-line interface. Supports dozens of services out of the box.',
  'https://github.com/jackwener/opencli',
  NULL,
  '/icons/opencli.svg',
  'community',
  'Jack Wener',
  'Go',
  8100,
  'Developer Tools',
  'go install github.com/jackwener/opencli@latest'
),
(
  'dingtalk-workspace-cli',
  'DingTalk Workspace CLI',
  'Official CLI tool for DingTalk (钉钉) workspace, enabling AI agents to manage messages, groups, tasks, and workflows from the command line.',
  'https://github.com/DingTalk-Real-AI/dingtalk-workspace-cli',
  'https://www.dingtalk.com',
  '/icons/dingtalk.svg',
  'official',
  'DingTalk',
  'TypeScript',
  670,
  'Communication',
  'npm install -g @anthropic/dingtalk-workspace-cli'
),
(
  'lark-cli',
  'Feishu/Lark CLI',
  'Official CLI tool for Feishu (飞书) / Lark, providing command-line access to messaging, documents, sheets, and approval workflows.',
  'https://github.com/larksuite/cli',
  'https://www.feishu.cn',
  '/icons/lark.svg',
  'official',
  'ByteDance',
  'Go',
  280,
  'Communication',
  'go install github.com/larksuite/cli@latest'
),
(
  'obsidian-cli',
  'Obsidian CLI',
  'Official CLI tool for Obsidian, enabling AI agents and scripts to create, read, search, and manage notes in your Obsidian vault from the command line.',
  'https://github.com/obsidianmd/obsidian-cli',
  'https://obsidian.md',
  '/icons/obsidian.svg',
  'official',
  'Obsidian',
  'TypeScript',
  1200,
  'Productivity',
  'npm install -g @nichochar/obsidian-cli'
);
