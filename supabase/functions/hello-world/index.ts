import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve((req: Request) => {
  // Handle preflight (CORS) requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Actual response
  return new Response(
    JSON.stringify({ message: "Hello from Supabase Edge Function 👋" }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
});


// https://ileyngdsdteudbbywmms.supabase.co/functions/v1/hello-world