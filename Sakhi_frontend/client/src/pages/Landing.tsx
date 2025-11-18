import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Flower2, Sparkles, Heart, Moon } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-peach-50 to-blush-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="bg-gradient-to-br from-lavender-400 to-peach-400 p-6 rounded-full shadow-lg">
              <Flower2 className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl font-bold bg-gradient-to-r from-lavender-600 via-peach-500 to-blush-500 bg-clip-text text-transparent"
            >
              Sakhi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-lavender-700 font-medium"
            >
              Your Wellness Companion
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-lavender-600 max-w-2xl mx-auto leading-relaxed"
          >
            A safe, supportive space for Indian women to explore yoga, wellness, and mindful living.
            Your journey to inner peace starts here.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8"
          >
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-lavender-200">
              <Sparkles className="w-8 h-8 text-lavender-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lavender-800 mb-2">Personalized Guidance</h3>
              <p className="text-sm text-lavender-600">
                Yoga practices tailored to your journey and goals
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-peach-200">
              <Heart className="w-8 h-8 text-peach-500 mx-auto mb-3" />
              <h3 className="font-semibold text-peach-800 mb-2">Safe Space</h3>
              <p className="text-sm text-peach-600">
                Confidential support for your wellness questions
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-blush-200">
              <Moon className="w-8 h-8 text-blush-500 mx-auto mb-3" />
              <h3 className="font-semibold text-blush-800 mb-2">Mindful Living</h3>
              <p className="text-sm text-blush-600">
                Balance for body, mind, and spirit
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="pt-4"
          >
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-lavender-500 to-peach-400 hover:from-lavender-600 hover:to-peach-500 text-white font-semibold px-12 py-6 text-lg rounded-full shadow-xl border-0"
              >
                Begin Your Journey
              </Button>
            </Link>

            <p className="text-sm text-lavender-500 mt-4">
              Sign in with Replit to get started
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
