/*
  # SatyaNetra Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamptz)

    - `analysis_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `input_data` (text) - stores text or image metadata
      - `result_score` (numeric) - risk score 0-1
      - `result_label` (text) - classification label
      - `analysis_type` (text) - 'text' or 'meme'
      - `created_at` (timestamptz)

    - `alerts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `severity` (text) - 'critical', 'high', 'medium', 'low'
      - `timestamp` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Admin policies for alert management

  3. Important Notes
    - All timestamps use UTC
    - UUIDs are auto-generated
    - Passwords are bcrypt hashed (never stored plain)
    - RLS ensures users can only access their own analysis logs
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create analysis_logs table
CREATE TABLE IF NOT EXISTS analysis_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  input_data text NOT NULL,
  result_score numeric NOT NULL CHECK (result_score >= 0 AND result_score <= 1),
  result_label text NOT NULL,
  analysis_type text NOT NULL CHECK (analysis_type IN ('text', 'meme')),
  created_at timestamptz DEFAULT now()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  timestamp timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_analysis_logs_user_id ON analysis_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_logs_created_at ON analysis_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- RLS Policies for analysis_logs table
CREATE POLICY "Users can view own analysis logs"
  ON analysis_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own analysis logs"
  ON analysis_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own analysis logs"
  ON analysis_logs FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for alerts table (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view alerts"
  ON alerts FOR SELECT
  TO authenticated
  USING (true);

-- Note: Alert creation/updates are handled by backend service role
-- Frontend users have read-only access to alerts
