import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseReady = !!(
  url && key &&
  url !== 'your_supabase_project_url' &&
  key !== 'your_supabase_anon_key'
);

export const supabase = isSupabaseReady ? createClient(url, key) : null;
