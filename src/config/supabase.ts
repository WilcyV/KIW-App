import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// ── Reemplaza estos valores con los tuyos de https://supabase.com ──────────
const SUPABASE_URL  = 'https://TU_PROJECT_URL.supabase.co';
const SUPABASE_ANON = 'TU_ANON_PUBLIC_KEY';
// ──────────────────────────────────────────────────────────────────────────

const SecureStoreAdapter = {
  getItem:    (key: string)              => SecureStore.getItemAsync(key),
  setItem:    (key: string, val: string) => SecureStore.setItemAsync(key, val),
  removeItem: (key: string)              => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    storage:          SecureStoreAdapter,
    autoRefreshToken: true,
    persistSession:   true,
    detectSessionInUrl: false,
  },
});
