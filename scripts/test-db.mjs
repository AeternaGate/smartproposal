import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://laeuwzpqmqjwdicfhqld.supabase.co",
  "sb_publishable_PZ22C7GkJIPSv2ksf0W9gA_KZokTz3T",
);

async function runMigrationViaRest() {
  // Supabase REST API doesn't support raw SQL execution
  // But we can use the pg_dump approach or Supavisor
  console.log("Testing supabase-js connection...");

  const { data, error } = await supabase.auth.getSession();
  console.log("Auth check:", error ? error.message : "OK (no session)");

  // Check if users table exists by trying to select from it
  const { error: tableError } = await supabase.from("users").select("id").limit(1);
  if (tableError && tableError.code === "PGRST116") {
    console.log("Table 'users' does not exist yet - need to run migrations");
  } else if (tableError) {
    console.log("Query error:", tableError.message);
  } else {
    console.log("Table 'users' exists!");
  }
}

runMigrationViaRest().catch(console.error);
