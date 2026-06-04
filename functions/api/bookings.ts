export const onRequestGet = async ({ env }) => {
  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM bookings ORDER BY created_at DESC"
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
    const data = await request.json();
    const { 
      room_type, check_in, check_out, guest_name, 
      phone, email, guests_count, occasion, requests 
    } = data;

    await env.DB.prepare(
      `INSERT INTO bookings (
        room_type, check_in, check_out, guest_name, 
        phone, email, guests_count, occasion, requests
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      room_type, check_in, check_out, guest_name, 
      phone, email, guests_count, occasion, requests
    ).run();

    return new Response(JSON.stringify({ message: "Booking request received" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
