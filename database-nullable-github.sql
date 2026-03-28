-- Make github_url nullable to support CLI tools without GitHub repos
ALTER TABLE cli_tools ALTER COLUMN github_url DROP NOT NULL;

-- Add homepage_url as an alternative link for non-GitHub tools
-- (already nullable, no change needed)
