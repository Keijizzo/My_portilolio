import { motion } from "framer-motion";

export default function SectionHeader({ id, title, subtitle }) {
  const words = title.split(" ");
  const lastWord = words.pop();
  const rest = words.join(" ");

  return (
    <motion.header
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-12 text-center"
    >
      <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
        Portfolio
      </span>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-theme md:text-5xl">
        {rest && <span>{rest} </span>}
        <span className="gradient-text">{lastWord}</span>
      </h2>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-theme-muted">{subtitle}</p>}
    </motion.header>
  );
}
