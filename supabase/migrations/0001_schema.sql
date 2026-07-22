-- SmartProposal Database Schema
-- Run this in Supabase Dashboard → SQL Editor

-- Enums
CREATE TYPE subscription_tier AS ENUM ('free', 'pro');
CREATE TYPE proposal_status AS ENUM ('draft', 'sent', 'viewed', 'accepted', 'rejected');
CREATE TYPE document_type AS ENUM ('proposal', 'invoice', 'contract');

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  subscription_tier subscription_tier NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  documents_used_this_month INTEGER NOT NULL DEFAULT 0,
  subscription_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  type document_type NOT NULL DEFAULT 'proposal',
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  status proposal_status NOT NULL DEFAULT 'draft',
  recipient_email TEXT,
  recipient_name TEXT,
  share_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_templates_user_id ON templates(user_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_share_token ON documents(share_token);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "users_select_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "templates_select_own" ON templates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "templates_select_public" ON templates FOR SELECT USING (is_public = true);
CREATE POLICY "templates_insert_own" ON templates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "templates_update_own" ON templates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "templates_delete_own" ON templates FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "documents_select_own" ON documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "documents_insert_own" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "documents_update_own" ON documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "documents_delete_own" ON documents FOR DELETE USING (auth.uid() = user_id);
