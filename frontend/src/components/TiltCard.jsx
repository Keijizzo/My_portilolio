import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`perspective-1000 preserve-3d ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
