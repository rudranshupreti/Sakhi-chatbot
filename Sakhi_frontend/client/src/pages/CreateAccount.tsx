import { Link, useLocation } from "wouter";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [, setLocation] = useLocation();

  const handleSignup = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      setLoading(true);

      // create user
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // update name
      await updateProfile(user.user, {
        displayName: name,
      });

      // redirect to home
      setLocation("/");

    } catch (err: any) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
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

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Create Your Account ✨
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Start your wellness journey with your personal companion.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-300 outline-none transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-300 outline-none transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-300 outline-none transition"
          />
        </div>

        <button
          onClick={handleSignup}
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-full font-medium shadow-md hover:opacity-90 transition"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <Link href="/login">
          <p className="text-sm text-gray-500 mt-6 cursor-pointer">
            Already have an account?{" "}
            <span className="text-purple-600 font-medium hover:underline">
              Login
            </span>
          </p>
        </Link>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
