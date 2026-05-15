import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "../context/LanguageContext";

export default function Qualifications() {
  const { t } = useLanguage();
  const { items, certs } = t.qualifications;

  return (
    <section id="qualifications" className="section-glow px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.qualifications.title} subtitle={t.qualifications.subtitle} />
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="card-shine glass-panel rounded-3xl p-8"
          >
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-emerald-600 dark:text-emerald-400">
              <span className="text-2xl">🎓</span> {t.qualifications.education}
            </h3>
            <ul className="mt-6 space-y-5">
              {items.map((item) => (
                <motion.li
                  key={item.degree}
                  whileHover={{ x: 6 }}
                  className="border-l-2 border-emerald-500 pl-4"
                >
                  <p className="font-semibold text-theme">{item.degree}</p>
                  <p className="text-sm text-theme-muted">{item.school}</p>
                  <p className="text-xs text-theme-muted opacity-80">{item.year}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="card-shine glass-panel rounded-3xl p-8"
          >
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-emerald-600 dark:text-emerald-400">
              <span className="text-2xl">📜</span> {t.qualifications.certifications}
            </h3>
            <ul className="mt-6 space-y-4">
              {certs.map((cert, i) => (
                <motion.li
                  key={cert}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="skill-card flex items-center gap-3 rounded-xl px-4 py-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    ✓
                  </span>
                  <span className="text-theme-muted">{cert}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
