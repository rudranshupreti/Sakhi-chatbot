import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

import { login, loginWithGoogle } from "@/lib/firebaseAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  // Email login
  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      setLocation("/chat"); // redirect after login
    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setLocation("/chat");
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-peach-50 to-blush-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 max-w-md w-full text-center border border-white/40"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-white shadow-md">
            <Flower2 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome Back ✨
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Continue your healing journey with your personal wellness companion.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2
              focus:ring-purple-300 outline-none transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2
              focus:ring-purple-300 outline-none transition"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3
            rounded-full font-medium shadow-md hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full
            border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        {/* Bottom Link */}
        <Link href="/createAccount">
          <p className="text-sm text-gray-500 mt-6 cursor-pointer">
            New here?{" "}
            <span className="text-purple-600 font-medium hover:underline">
              Create an Account
            </span>
          </p>
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
