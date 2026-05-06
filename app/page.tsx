import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: pulseRows, error } = await supabase
    .from("pulse")
    .select("*")
    .order("score", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
  }

  const errorText = error
    ? error.message || error.details || error.hint || JSON.stringify(error)
    : null;

  const permissionHint =
    error?.code === "42501"
      ? "Permission denied for table pulse. Grant SELECT to anon in Supabase."
      : null;

  return (
    <main style={{ padding: 40, fontSize: 20 }}>
      <h1>Pulse v0.1</h1>
      <p>Live stylist scores from Supabase:</p>

      {error && (
        <p style={{ color: "red" }}>
          {permissionHint || `Error loading data. ${errorText}`}
        </p>
      )}

      <ul>
        {pulseRows?.map((row) => (
          <li key={row.id} style={{ marginTop: 10 }}>
            <strong>{row.stylist_id}</strong> — {row.score}
          </li>
        ))}
      </ul>
    </main>
  );
}
