"use client";

import React, { useState } from "react";
import { CardStack } from "./LoginCards";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!name?.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: role || "Employee" }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px] p-4">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 rounded-2xl p-8 flex flex-col justify-between text-white relative overflow-hidden min-h-[400px] md:min-h-full">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 opacity-30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <p className="text-blue-200 text-sm font-medium tracking-wide">You can easily</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Create your account <br /> in minutes
            </h1>
          </div>

          <div className="relative z-10 space-y-4 px-5">
            <p className="text-blue-200 text-xs font-medium tracking-wider text-center">Our partners</p>
            <CardStack />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
              <p className="text-gray-400 text-sm mt-1">Sign up to get started with your workspace.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Full name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-blue-600 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Role</label>
                <select
                  id="role"
                  name="role"
                  defaultValue="Employee"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-800">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition duration-200 text-sm shadow-md shadow-blue-500/20"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
