export const onRequestPatch = async ({ request, env, params }) => {
  try {
    const { id } = params;
    const { status } = await request.json();

    await env.DB.prepare(
      "UPDATE bookings SET status = ? WHERE id = ?"
    ).bind(status, id).run();

    return new Response(JSON.stringify({ message: "Status updated" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
