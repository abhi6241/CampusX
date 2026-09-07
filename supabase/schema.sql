-- CampusConnect Database Schema
-- Run this in Supabase SQL Editor

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  branch TEXT NOT NULL,
  year INTEGER NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create unique compound index on lowercase first_name and last_name
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_name_unique
  ON profiles (LOWER(first_name), LOWER(last_name));

-- Create index on roll_number for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_roll_number
  ON profiles (roll_number);

-- Create index on branch for filtering
CREATE INDEX IF NOT EXISTS idx_profiles_branch
  ON profiles (branch);

-- Create index on year for filtering
CREATE INDEX IF NOT EXISTS idx_profiles_year
  ON profiles (year);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all profiles
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy: Users can delete their own profile
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  email TEXT;
  year_code TEXT;
  branch_code TEXT;
  roll_suffix TEXT;
  branch_name TEXT;
  join_year INTEGER;
BEGIN
  email := NEW.email;

  -- Extract parts from email: 1602-YY-BBB-RRR@vce.ac.in
  year_code := SUBSTRING(email FROM '1602-(\d{2})');
  branch_code := SUBSTRING(email FROM '1602-\d{2}-(\d{3})');
  roll_suffix := SUBSTRING(email FROM '1602-\d{2}-\d{3}-(\d{3})');

  -- Calculate year
  join_year := 2000 + year_code::INTEGER;

  -- Map branch code to name
  branch_name := CASE branch_code
    WHEN '001' THEN 'CSE'
    WHEN '002' THEN 'ECE'
    WHEN '003' THEN 'EEE'
    WHEN '004' THEN 'ME'
    WHEN '005' THEN 'CE'
    WHEN '006' THEN 'IT'
    WHEN '007' THEN 'AI'
    WHEN '008' THEN 'DS'
    ELSE 'Unknown'
  END;

  INSERT INTO public.profiles (id, first_name, last_name, roll_number, branch, year)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    '1602-' || year_code || '-' || branch_code || '-' || roll_suffix,
    branch_name,
    join_year
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
