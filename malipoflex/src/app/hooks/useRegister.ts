

"use client";
import { useState } from "react";
import { fetchRegister } from "../utils/fetchRegister";

const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRegister(first_name, last_name, phone_number, email, password);
      return result;
    } catch (error) {
      setError((error as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;