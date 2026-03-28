-- Allow public insert access (for API submissions)
CREATE POLICY "Allow public insert access" ON cli_tools
  FOR INSERT WITH CHECK (true);

-- Allow public update access (for API updates)
CREATE POLICY "Allow public update access" ON cli_tools
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow public delete access (for API deletes)
CREATE POLICY "Allow public delete access" ON cli_tools
  FOR DELETE USING (true);
