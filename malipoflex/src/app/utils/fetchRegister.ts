const baseUrl = '/api/register/';

export async function fetchRegister(
  first_name: string,
  last_name: string,
  phone_number: string,
  email: string,
  password: string,
) {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name,
      last_name,
      phone_number,
      email,
      password,
      user_type: "MANAGER",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = 
      data.non_field_errors?.[0] ||
      data.email?.[0] ||
      data.phone_number?.[0] ||
      data.detail ||
      "Registration failed";
    throw new Error(errorMessage);
  }

  return data;
}