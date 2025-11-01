"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useForgotPassword from "../../hooks/useForgotPassword";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const { forgotPassword, loading, error } = useForgotPassword();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setImageWidth(window.innerWidth / 2);
      setImageHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSendOtp = async () => {
    try {
      const result = await forgotPassword(email);
      setMessage("Verification code sent successfully!");
      localStorage.setItem("forgotPasswordEmail", email); 
     setTimeout(() => {
    router.push("/authentication/verify-otp");
  }, 2000); 
    } catch (err) {
      setMessage("");
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSendOtp();
  };

  return (
    <div className="flex flex-row items-stretch w-screen h-screen bg-gray-100 text-black">
      <div className="w-1/2 h-full bg-white flex">
        <Image
          src="/images/people.png"
          alt="Group photo"
          width={imageWidth}
          height={imageHeight}
        className="object-cover rounded-t-lg md:rounded-l-lg rounded-br-[150px_150px]"
        />
      </div>
      <div className="w-1/2 h-full bg-white flex flex-col justify-center p-6">
        <h2 className="text-xl font-semibold text-[#075D74] mb-6 text-center md:text-left">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 text-center md:text-left">
              Enter email address to receive verification code
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              className="border border-[#075D74] rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#075D74]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-[#075D74] text-white py-2 rounded-md hover:bg-opacity-90 cursor-pointer transition duration-200"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
            <a href="/authentication/login" className="text-center text-sm text-[#075D74] hover:underline">
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}