import { Link } from "react-router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password123") {
      toast.success("Login successful");
      window.location.href = "/dashboard";
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login coming soon!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-4 dark:bg-gray-900">
      {/* ASU Logo Centered */}
      <img
        src="/src/assets/ASU-Logo.png"
        alt="ASU Logo"
        className="h-14 mb-4"
      />

      {/* Login Form Box */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-white mb-6">
          Log in to RAG Model
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 placeholder-blue-400 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 placeholder-blue-400 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <div className="h-px bg-gray-300 dark:bg-gray-600 w-full"></div>
          <span className="px-2 text-sm text-gray-400">or</span>
          <div className="h-px bg-gray-300 dark:bg-gray-600 w-full"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-medium py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
