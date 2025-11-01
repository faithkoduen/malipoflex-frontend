"use client";
import { useState } from "react";
import { verifyOtp } from "../utils/fetchVerifyOtp";


const useVerifyOtp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const verify = async (
      email:string,
      otp_code:string,
    ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await verifyOtp(
      email,
      otp_code,
      );
      if (!result) {
        throw new Error("Otp Verification failed");
      }
      return result;
    } catch (error) {
      setError((error as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { verify, loading, error };
};
export default useVerifyOtp;
