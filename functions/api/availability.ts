export const onRequestGet = async ({ env }) => {
  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM availability"
    ).all();
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestPost = async ({ request, env }) => {
  try {
    const { room_type, blocked_date, reason } = await request.json();
    
    // Check if already blocked
    const existing = await env.DB.prepare(
      "SELECT id FROM availability WHERE room_type = ? AND blocked_date = ?"
    ).bind(room_type, blocked_date).first();

    if (existing) {
      // If exists, unblock it (toggle behavior for admin)
      await env.DB.prepare(
        "DELETE FROM availability WHERE id = ?"
      ).bind(existing.id).run();
      return new Response(JSON.stringify({ message: "Unblocked" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    await env.DB.prepare(
      "INSERT INTO availability (room_type, blocked_date, reason) VALUES (?, ?, ?)"
    ).bind(room_type, blocked_date, reason).run();
    
    return new Response(JSON.stringify({ message: "Blocked" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
