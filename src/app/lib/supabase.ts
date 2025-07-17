import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aszswvhkichtsmybkphr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzenN3dmhraWNodHNteWJrcGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODIxMjUsImV4cCI6MjA2ODE1ODEyNX0.DkRd38BWcubBFWZFV5qg6wV8MyJAiGQRiL4TatI-JZY";

export const supabase = createClient(supabaseUrl, supabaseKey);
