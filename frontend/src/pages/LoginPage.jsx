import React, { useState, useEffect } from "react";
import { FaEye, FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleSignIn = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      onLogin(email);
      navigate("/homepage");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-700">

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-semibold text-white tracking-wide">
            Swastha Sangai
          </h2>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-white"
              >
                {showPassword ? <FaRegEye/> : <FaRegEyeSlash/>}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">Register</a>
        </p>

        <div className="mt-6 text-center">
        </div>

      </div>
    </div>
  );
}
