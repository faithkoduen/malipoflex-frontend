const baseUrl = process.env.BASE_URL;

export async function GET() {
  try {
       const response = await fetch(`${baseUrl}savingsContributions/`);
    if (!response.ok) {
      throw new Error("Failed to fetch savings contributions: " + response.statusText);
    }
    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await fetch(`${baseUrl}savingsContributions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to post savings contribution: " + response.statusText);
    }

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}