const baseUrl = process.env.BASE_URL;
export async function POST(request: Request) {
  try {
    const { email, new_password, confirm_password } = await request.json();

    if (!email || !new_password || !confirm_password) {
      return new Response(
        JSON.stringify({ detail: "Email, new password, and confirm password are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (new_password !== confirm_password) {
      return new Response(
        JSON.stringify({ detail: "Passwords do not match." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const response = await fetch(`${baseUrl}/resetPassword/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, new_password, confirm_password }),
    });
    const result = await response.json();
    if (!response.ok) {
    
      return new Response(
        JSON.stringify("Failed to reset password" ),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ detail: "Password reset successfully", data: result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ detail: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
