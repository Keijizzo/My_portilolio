import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "../context/LanguageContext";

export default function About({ profile }) {
  const { t } = useLanguage();
  const highlights = [
    { label: t.about.h1, desc: t.about.h1d },
    { label: t.about.h2, desc: t.about.h2d },
    { label: t.about.h3, desc: t.about.h3d },
  ];

  return (
    <section id="about" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.about.title} subtitle={t.about.subtitle} />
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <motion.div whileHover={{ scale: 1.01 }} className="card-shine glass-panel-strong rounded-3xl p-8 md:p-10">
              <p className="text-lg leading-relaxed text-theme-muted md:text-xl">
                {profile?.bio ||
                  "Data Scientist and EASTC student with Master in M&E and Bachelor in Finance from Mzumbe University."}
              </p>
              <div className="mt-8 h-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-2"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
                className="skill-card cursor-default rounded-2xl p-5 transition"
              >
                <h3 className="font-display font-bold text-emerald-600 dark:text-emerald-400">{item.label}</h3>
                <p className="mt-1 text-sm text-theme-muted">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
