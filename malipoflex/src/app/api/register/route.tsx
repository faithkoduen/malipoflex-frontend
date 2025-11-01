
const baseUrl = process.env.BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { first_name, last_name, phone_number, email, password } = body;

    if (!first_name || !last_name || !phone_number || !email || !password) {
      return new Response(
        JSON.stringify({ detail: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const payload = {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      user_type: "MANAGER",
    };

    const response = await fetch(`${baseUrl}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Registration proxy error:", error);
    return new Response(
      JSON.stringify({ detail: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}