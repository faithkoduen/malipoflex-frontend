

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLogin from "../../hooks/useLogin";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await login(formData);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#FFFFFF] min-h-screen">
      <div className="md:w-1/2 max-h-259 relative overflow-hidden">
        <Image
          src="/people.png"
          alt="informal workers"
          fill
          className="object-cover rounded-t-lg md:rounded-l-lg rounded-br-[150px_150px]"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#FFFFFF] p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl p-12 rounded-md bg-[#FFFFFF]"
        >
          <h2 className="text-[40px] font-bold text-center text-[#075D74] mb-8">
            Login
          </h2>
          <div className="mb-6">
            <label className="block font-regular mb-2 text-[#000000] text-[20px]">
              Phone Number
            </label>
            <input
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className="w-full px-6 py-4 rounded-[7px] border border-[#075D74] bg-[#FFFFFF] text-[#000000] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#075D74]"
            />
          </div>
          <div className="mb-10 relative">
            <label className="block font-regular mb-2 text-[#000000] text-[20px]">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-6 py-4 rounded-[7px] border border-[#075D74] bg-[#FFFFFF] text-[#000000] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#075D74]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#000000] text-xl"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <Link
              href="/authentication/forgot-password"
              className="absolute right-6 top-25 text-[#000000] text-[18px] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {error && (
            <div className="mb-4 text-center text-red-600 font-medium">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6  rounded-[10px] bg-[#075D74] text-[#FFFFFF] cursor-pointer text-[30px] font-bold hover:bg-[#075D74] transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Sign In"}
          </button>
          <div className="text-center mt-5 text-[#000000] text-[18px] font-regular">
            Don't have an account?{" "}
            <Link href="/authentication/register" className="font-bold underline text-[#075D74] text-[18px]">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}