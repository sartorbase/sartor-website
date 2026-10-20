import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface LeadSubmissionPayload {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  fitting_goal: string;
  source: string;
  created_at?: string;
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  // Check Vite import.meta.env or Node/Next process.env
  let supabaseUrl = '';
  let supabaseAnonKey = '';

  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      supabaseUrl =
        (import.meta.env.VITE_SUPABASE_URL as string) ||
        (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
        '';
      supabaseAnonKey =
        (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
        (import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) ||
        '';
    }
  } catch {
    // ignore
  }

  if (!supabaseUrl && typeof process !== 'undefined' && process.env) {
    supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      '';
    supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      '';
  }

  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
      return supabaseInstance;
    } catch (err) {
      console.warn('[SARTOR Supabase] Initialization error:', err);
    }
  }

  return null;
}

/**
 * Saves a measurement lead directly to Supabase (`leads` or `measurement_leads` table).
 * Gracefully handles scenarios where Supabase credentials are not yet configured or table schema differs.
 */
export async function saveLeadToSupabase(lead: LeadSubmissionPayload): Promise<{ success: boolean; error?: string }> {
  const payload = {
    full_name: lead.full_name,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    fitting_goal: lead.fitting_goal,
    source: lead.source || 'lead_magnet',
    created_at: lead.created_at || new Date().toISOString(),
  };

  // Also sync with server endpoint in background
  if (typeof window !== 'undefined') {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // non-blocking
    });
  }

  const client = getSupabaseClient();
  if (!client) {
    console.info('[SARTOR Lead Captured Locally - Supabase credentials not configured in env]', payload);
    // Store in localStorage if in browser so lead is never lost
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('sartor_pending_leads') || '[]');
        stored.push(payload);
        localStorage.setItem('sartor_pending_leads', JSON.stringify(stored));
      } catch {
        // ignore storage errors
      }
    }
    return { success: true };
  }

  try {
    // Try primary 'leads' table
    const { error: primaryError } = await client.from('leads').insert([payload]);
    if (!primaryError) {
      return { success: true };
    }

    // If 'leads' failed, try 'measurement_leads'
    console.warn('[SARTOR Supabase] Insertion to "leads" failed, trying "measurement_leads":', primaryError.message);
    const { error: fallbackError } = await client.from('measurement_leads').insert([payload]);
    if (!fallbackError) {
      return { success: true };
    }

    console.error('[SARTOR Supabase] Failed to insert lead into Supabase tables:', fallbackError.message);
    return { success: false, error: fallbackError.message };
  } catch (err: any) {
    console.error('[SARTOR Supabase] Lead submission exception:', err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}
