"use client";

import Image from "next/image";

import { useEffect,useState } from "react";
import { useResetPassword } from "../../hooks/useFetchResetPassword";

function PasswordInputWithToggle({
  label,
  id,
  value,
  onChange,
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#075D74]"
          value={value}
          onChange={onChange}
          required={required}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a9.963 9.963 0 014-4.243M9.878 9.879a3 3 0 104.243 4.242" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  const {
    new_password,
    setPassword,
    confirm_password,
    setConfirmPassword,
    error,
    message,
    loading,
    handleResetPassword,
    email,
  } = useResetPassword();


  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleResetPassword();
   
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 text-black p-4">
      <div className="w-full h-full bg-white rounded-lg shadow-lg flex overflow-hidden">
        <Image
          src="/images/people.png"
          alt="Group photo"
          width={500}
          height={500}
          priority
          className="object-cover rounded-t-lg md:rounded-l-lg rounded-br-[150px_150px]"
        />

        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-[#075D74] mb-6">Reset Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" value={email} />

            <PasswordInputWithToggle
              label="Enter new password"
              id="new-password"
              value={new_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordInputWithToggle
              label="Confirm Password"
              id="confirm-password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#075D74] text-white py-2 cursor-pointer rounded-md hover:bg-opacity-90 transition duration-200"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
