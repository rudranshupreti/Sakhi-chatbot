import { motion } from "framer-motion";

export default function LoadingDots() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  };

  return (
    <div className="flex items-center gap-1.5" data-testid="loading-dots">
      <motion.div
        className="h-2 w-2 rounded-full bg-primary/60"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0 }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-primary/70"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.15 }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-primary/80"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.3 }}
      />
    </div>
  );
}
