export interface CliTool {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  github_url: string | null;
  homepage_url: string | null;
  icon_url: string | null;
  maintainer_type: 'official' | 'community';
  maintainer_name: string | null;
  primary_language: string | null;
  stars: number;
  category: string | null;
  install_command: string | null;
  created_at: string;
  updated_at: string;
}
