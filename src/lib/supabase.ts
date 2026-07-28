import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://rflonvoiimjhblhtcnka.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmbG9udm9paW1qaGJsaHRjbmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTcxMDIsImV4cCI6MjA2OTE5MzEwMn0.WRJz-0hp4ZaZJbSd8PRATu3ns7HRBOGlnTeKu27CYaiW'
);
