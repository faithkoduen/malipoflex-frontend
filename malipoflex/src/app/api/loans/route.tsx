// const baseUrl = process.env.BASE_URL;
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}loanAccounts/`);
    if (!response.ok) {
      return new Response("Failed to fetch loans", { status: response.status });
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




