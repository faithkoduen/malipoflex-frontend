"use client";
import { useState } from "react";
import { fetchLogin } from "../utils/fetchLogin";

interface LoginCredentials {
  phone_number: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLogin(credentials);
      if (data?.token) {
        return { token: data.token };
      } else {
        setError("Unexpected response from server");
        return null;
      }
    } catch (error) {
      setError((error as Error).message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;