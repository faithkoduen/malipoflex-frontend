export async function ForgotPassword(email: string) {
  const response = await fetch("/api/forgot_password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to send OTP");
  }

  return await response.json();
}