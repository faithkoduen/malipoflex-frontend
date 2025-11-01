const baseUrl = process.env.BASE_URL;
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp_code } = body;
    if (!email || !otp_code) {
      return new Response("Missing required values: email, otp", {
        status: 400,
      });
    }
    const response = await fetch(`${baseUrl}/verifyCode/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp_code,
      }),
    });
    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      statusText: "Otp verified successfully",
    });
  } catch (error) {
    return new Response("Failed to verify otp: " , {
      status: 500,
    });
  }
}


