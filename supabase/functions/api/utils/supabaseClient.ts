import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.5";

const supabaseUrl = "https://ccluebluefqzegkxwvaj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbHVlYmx1ZWZxemVna3h3dmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NDA2NjUsImV4cCI6MjAzODQxNjY2NX0.e3Tz9TIYNelayt48Fm8dFH1oBWF9vKIeBH-GAB5UKyo";
// const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
// const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
export const supabase = createClient(supabaseUrl, supabaseKey);
