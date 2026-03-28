-- Add agent_install_command column for AI agent install instructions
ALTER TABLE cli_tools ADD COLUMN agent_install_command text;
