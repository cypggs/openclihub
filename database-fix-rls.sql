-- Drop and recreate all policies to ensure they work correctly
DROP POLICY IF EXISTS "Allow public read access" ON cli_tools;
DROP POLICY IF EXISTS "Allow public insert access" ON cli_tools;
DROP POLICY IF EXISTS "Allow public update access" ON cli_tools;
DROP POLICY IF EXISTS "Allow public delete access" ON cli_tools;

-- Recreate all policies
CREATE POLICY "Allow anon select" ON cli_tools FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert" ON cli_tools FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update" ON cli_tools FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon delete" ON cli_tools FOR DELETE TO anon USING (true);
