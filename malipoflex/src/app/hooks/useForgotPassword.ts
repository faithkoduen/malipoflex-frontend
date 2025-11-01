"use client";
import { useState } from "react";
import { ForgotPassword } from "../utils/fetchForgotPassword";

const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await ForgotPassword(email);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "failed to send otp";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error };
};

export default useForgotPassword;