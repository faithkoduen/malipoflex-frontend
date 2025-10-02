const baseUrl = "/api/login/";

export async function fetchLogin(credentials: { phone_number: string; password: string }) {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.non_field_errors?.[0] || data.detail || "Login failed";
    throw new Error(errorMessage);
  }

  return data;
}