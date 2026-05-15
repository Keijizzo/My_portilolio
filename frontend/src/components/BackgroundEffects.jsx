import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <motion.div
        className="orb absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald-600/25"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-cyan-600/20"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-600/15"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
