import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { getSkillIcon } from "../utils/skillIcons";
import { useLanguage } from "../context/LanguageContext";

export default function Skills({ skills, loading, error, onRetry }) {
  const [activeId, setActiveId] = useState(null);
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-glow px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.skills.title} subtitle={t.skills.subtitle} />
        {loading && <Loader label="Loading..." />}
        {error && <ErrorMessage message={error} onRetry={onRetry} />}
        {!loading && !error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                onHoverStart={() => setActiveId(skill.id)}
                onHoverEnd={() => setActiveId(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`card-shine group cursor-default rounded-2xl border p-5 transition-all duration-300 ${
                  activeId === skill.id ? "skill-card-active" : "skill-card hover:border-emerald-500/30"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <motion.span
                    className="text-3xl"
                    animate={activeId === skill.id ? { rotate: [0, -10, 10, 0], scale: 1.2 } : {}}
                  >
                    {getSkillIcon(skill.name)}
                  </motion.span>
                  <span className="font-display text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {skill.level}%
                  </span>
                </div>
                <h3 className="font-semibold text-theme">{skill.name}</h3>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.03 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400"
                  />
                </div>
                {activeId === skill.id && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-xs text-emerald-600 dark:text-emerald-300/80"
                  >
                    {t.skills.hint}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
