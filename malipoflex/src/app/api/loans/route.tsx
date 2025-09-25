const baseUrl = "http://127.0.0.1:8000/api"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const loanId = searchParams.get("loanId")

  try {
    if (loanId) {
      const response = await fetch(`${baseUrl}/loanAccounts/${loanId}/`)
      if (!response.ok) {
        throw new Error("Failed to fetch loan details: " + response.statusText)
      }
      const result = await response.json()
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const response = await fetch(`${baseUrl}/loanAccounts/`)
    if (!response.ok) {
      throw new Error("Failed to fetch all loans: " + response.statusText)
    }
    const result = await response.json()
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    })
  }
}