
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchResetPasswordApi } from "../utils/fetchResetPassword";


export function useResetPassword() {
 const [email, setEmail] = useState("");
 const [new_password, setPassword] = useState("");
 const [confirm_password, setConfirmPassword] = useState("");
 const [error, setError] = useState("");
 const [message, setMessage] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();
 const searchParams = useSearchParams();

 useEffect(() => {
  const storedEmail = localStorage.getItem("forgotPasswordEmail");
  if (storedEmail) {
    setEmail(storedEmail);
  } else {
    const queryEmail = searchParams.get("email") || "";
    setEmail(queryEmail);
  }
}, [searchParams]);
 useEffect(() => {
   if (error) setError("");
 }, [email, new_password, confirm_password]);

 const handleResetPassword = async () => {
   setError("");
   setMessage("");


   if (!email) {
     setError("Email is required.");
     return;
   }
   if (new_password.length < 8) {
     setError("Password must be at least 8 characters.");
     return;
   }
   if (new_password !== confirm_password) {
     setError("Passwords do not match.");
     return;
   }


   setLoading(true);
   try {
     const res = await fetchResetPasswordApi(email, new_password, confirm_password);
     if (!res || !res.detail) {
       throw new Error("Unexpected response from server.");
     }
     if (res.detail.toLowerCase().includes("successful")) {
       setMessage(res.detail.trim());
       setTimeout(() => {
         router.push("/authentication/register");
       }, 1500);
     } else {
       throw new Error(res.detail.trim() || "Error resetting password.");
     }
   } catch (error) {
     setError((error as Error).message || "Failed to reset password. Try again later.");
   } finally {
     setLoading(false);
   }
 };


 return {
   email,
   setEmail,
   new_password,
   setPassword,
   confirm_password,
   setConfirmPassword,
   error,
   message,
   loading,
   handleResetPassword,
 };
}











