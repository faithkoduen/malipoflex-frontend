
const baseUrl = process.env.BASE_URL; 

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.phone_number || !body.password) {
      return new Response(
        JSON.stringify({ non_field_errors: ["Phone number and password are required"] }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!baseUrl) {
      return new Response(
        JSON.stringify({ detail: "Server misconfiguration: BASE_URL not set" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Login proxy error:", error);
    return new Response(
      JSON.stringify({ detail: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}