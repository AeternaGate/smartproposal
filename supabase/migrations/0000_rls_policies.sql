-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Users: can only read/update own profile
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Templates: CRUD own, read public
CREATE POLICY "templates_select_own" ON templates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "templates_select_public" ON templates
  FOR SELECT USING (is_public = true);

CREATE POLICY "templates_insert_own" ON templates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "templates_update_own" ON templates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "templates_delete_own" ON templates
  FOR DELETE USING (auth.uid() = user_id);

-- Documents: CRUD own
CREATE POLICY "documents_select_own" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "documents_insert_own" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "documents_update_own" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "documents_delete_own" ON documents
  FOR DELETE USING (auth.uid() = user_id);
