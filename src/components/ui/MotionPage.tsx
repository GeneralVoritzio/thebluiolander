"use client";
import { motion } from "framer-motion";

export default function MotionPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
} 