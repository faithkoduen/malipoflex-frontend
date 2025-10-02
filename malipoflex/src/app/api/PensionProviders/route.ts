// const baseUrl = process.env.BASE_URL || "https://malipo-flex-7bced59326f9.herokuapp.com/api/";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}transactions/`);
    if (!response.ok) {
      throw new Error("Failed to fetch transactions : " + response.statusText);
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