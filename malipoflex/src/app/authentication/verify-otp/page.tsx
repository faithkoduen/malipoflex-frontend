"use client";

import { useEffect, useRef, useState } from "react";
import useVerifyOtp from "../../hooks/useFetchVerifyOtp";
import Image from "next/image";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState<string>("");
  const { verify, loading, error } = useVerifyOtp();
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>("");
  const otpRefs = useRef<HTMLInputElement[]>([]);

  
  useEffect(() => {
    setEmail(localStorage.getItem("forgotPasswordEmail") || "");
  }, []);

 
  useEffect(() => {
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, []);

  
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

 
  useEffect(() => {
    if (message && !error) {
      const timer = setTimeout(() => {
        window.location.href = "/authentication/reset-password";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleVerifyOtp = async () => {
    try {
   
      if (!/^\d{4}$/.test(otp)) {
        setMessage("");
        setResendMessage("");
        throw new Error("Please enter a valid 4-digit OTP");
      }
    
      const result = await verify(email, otp);
     
      setMessage("OTP verified successfully!");
    } catch (err: any) {
  
      setMessage("");
      throw new Error(err.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
     
      await verify(email, ""); 
      setResendMessage("OTP resent successfully!");
    } catch (err: any) {
   
      setResendMessage("");
      throw new Error(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
      setMessage("");
      setResendMessage("");
      throw new Error("Please enter a valid 4-digit OTP");
    }
    await handleVerifyOtp();
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.slice(-1);

    if (digit && !/^\d$/.test(digit)) return;

    const newOtp = otp.substring(0, index) + (digit || "") + otp.substring(index + 1);
    setOtp(newOtp);

    if (digit && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }

    if (!digit && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-screen h-screen flex bg-[#f5f7fa] text-black">
    
      <div className="w-1/2 h-full relative">
        <Image
          src="/images/people.png"
          alt="Verification"
          fill
         className="object-cover rounded-t-lg md:rounded-l-lg rounded-br-[150px_150px]"
          priority
        />
      </div>
    
      <div className="w-1/2 h-full flex items-center justify-center bg-white">
        <div className="max-w-md w-full px-8 py-12 rounded-lg flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#075D74] mb-6 text-center">
            Email Verification
          </h2>
          <p className="text-[#075D74] mb-8 text-center text-base">
            Please enter the 4-digit code that was sent to your email address
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
       
            <div className="flex justify-center gap-6 mb-2">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) otpRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-2xl font-semibold border-2 border-[#075D74] rounded-md bg-[#f5f7fa] focus:outline-none focus:border-[#075D74] transition"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                />
              ))}
            </div>
          
            <div className="text-center text-sm text-[#075D74]">
              If you didn’t receive the code
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendLoading || !email}
                className="font-semibold underline ml-1 hover:text-[#075D74] transition"
              >
                Resend
              </button>
            </div>
          
            <button
              type="submit"
              className="w-full py-3 bg-[#075D74] text-white cursor-pointer text-lg font-semibold rounded-md shadow hover:bg-[#06485b] transition"
              disabled={loading || otp.length !== 4 || !email}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
           
            {error && <p className="text-center text-red-600">{error}</p>}
            {message && <p className="text-center text-green-600">{message}</p>}
            {resendMessage && (
              <p className="text-center text-green-500 text-xs mt-2">{resendMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}