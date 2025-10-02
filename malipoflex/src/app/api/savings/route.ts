// src/app/api/savings/route.ts
import { NextResponse } from "next/server";

const externalBaseUrl = "http://127.0.0.1:8000/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); 

  let endpoint = "";
  if (type === "accounts") {
    endpoint = `${externalBaseUrl}/savingsAccounts/`;
  } else if (type === "contributions") {
    endpoint = `${externalBaseUrl}/savingsContributions/`;
  } else {
    return NextResponse.json({ error: "Invalid type parameter. Use 'accounts' or 'contributions'." }, { status: 400 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch savings data: " + response.statusText);
    }
    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { type } = body;

  let endpoint = "";
  if (type === "accounts") {
    endpoint = `${externalBaseUrl}/savingsAccounts/`;
  } else if (type === "contributions") {
    endpoint = `${externalBaseUrl}/savingsContributions/`;
  } else {
    return NextResponse.json({ error: "Invalid type parameter. Use 'accounts' or 'contributions'." }, { status: 400 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to create savings data: " + response.statusText);
    }
    const result = await response.json();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}