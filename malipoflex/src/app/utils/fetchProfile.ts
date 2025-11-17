const baseUrl = "/api/profile";

export async function fetchProfile(token: string) {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let errorMessage = "Failed to fetch profile";

    if (contentType && contentType.includes("application/json")) {
      const errorJson = await response.json();
      errorMessage = errorJson.message || errorMessage;
    } else {
      const errorText = await response.text();
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function updateProfile(token: string, data: FormData) {
  const response = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      // Do not set Content-Type for FormData; browser will handle it
    },
    body: data,
  });

  if (!response.ok) {
    let errorMsg = "Failed to update profile";
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorJson = await response.json();
      errorMsg = errorJson.message ?? errorMsg;
    } else {
      const errorText = await response.text();
      errorMsg = errorText || errorMsg;
    }
    throw new Error(errorMsg);
  }

  return response.json();
}