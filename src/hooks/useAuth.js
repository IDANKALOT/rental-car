import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';

export function useAuth() {
  const [user, setUser]       = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseReady);

  // ── Supabase mode ────────────────────────────────────────────
  useEffect(() => {
    if (!isSupabaseReady) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user);
      else setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) loadProfile(session.user);
      else { setUser(null); setAuthLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadProfile(authUser) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    setUser({
      id: authUser.id,
      email: authUser.email,
      name: profile?.name || authUser.email.split('@')[0],
      isAdmin: profile?.is_admin || false,
    });
    setAuthLoading(false);
  }

  // ── Shared login (Supabase or demo) ─────────────────────────
  const login = useCallback(async (email, password) => {
    if (!isSupabaseReady) {
      if (!email || !password) return { success: false, error: 'Udfyld e-mail og adgangskode.' };
      setUser({ name: email.split('@')[0], email, isAdmin: false });
      return { success: true };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: 'Ugyldig e-mail eller adgangskode.' };
    return { success: true };
  }, []);

  const register = useCallback(async (name, email, password) => {
    if (!isSupabaseReady) {
      if (!name || !email || !password) return { success: false, error: 'Udfyld alle felter.' };
      setUser({ name, email, isAdmin: false });
      return { success: true };
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return { success: false, error: error.message };
    return { success: true, needsConfirmation: true };
  }, []);

  const loginAdmin = useCallback(async (email, password) => {
    if (!isSupabaseReady) {
      if (!email || !password) return { success: false, error: 'Udfyld alle felter.' };
      setUser({ name: 'Admin', email, isAdmin: true });
      return { success: true };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: 'Ugyldig e-mail eller adgangskode.' };
    const { data: profile } = await supabase
      .from('profiles').select('is_admin').eq('id', data.user.id).single();
    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      return { success: false, error: 'Denne konto har ikke adgang til admin.' };
    }
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseReady) await supabase.auth.signOut();
    setUser(null);
  }, []);

  return { user, setUser, authLoading, login, loginAdmin, logout, register };
}
