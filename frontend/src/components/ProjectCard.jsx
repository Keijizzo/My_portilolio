import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

export default function ProjectCard({ project, index = 0 }) {
  const tags = project.tech_stack?.split(",").map((t) => t.trim()) || [];

  return (
    <TiltCard className="h-full">
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="card-shine skill-card group flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10"
      >
        <div className="mb-4 flex items-start justify-between">
          <motion.span
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-xl font-bold text-emerald-400"
            whileHover={{ rotate: 12, scale: 1.1 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.span
            className="rounded-full border border-emerald-500/30 px-2 py-0.5 text-xs text-emerald-400 opacity-0 transition group-hover:opacity-100"
          >
            Live API
          </motion.span>
        </div>

        <h3 className="font-display text-xl font-bold text-theme group-hover:text-emerald-500 transition">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-theme-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-300 transition group-hover:border-emerald-500/30 group-hover:text-emerald-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"
          >
            View project
            <span className="transition group-hover:translate-x-1">→</span>
          </motion.a>
        )}
      </motion.article>
    </TiltCard>
  );
}
