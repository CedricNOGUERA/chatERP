import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://fchrvqmvciagtrmflpoe.supabase.co";
// const supabaseUrl: string = "https://rcjrcafkungrcdguokup.supabase.co";
const supabaseAnonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjaHJ2cW12Y2lhZ3RybWZscG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2NjM4OTcsImV4cCI6MTk4NTIzOTg5N30.P0I1e92t1SE51o-8sqS2iCPpP1TkJljtDnP-1aA3dKQ";
// const supabaseAnonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjanJjYWZrdW5ncmNkZ3Vva3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAxNjE4NDAsImV4cCI6MTk3NTczNzg0MH0.CK0Zc8qXaOfXljeFh7e7UnccHZ5Eh4tCnxWG84NcUsI";

/**
 * Create a new Supabase Client.
 */
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
