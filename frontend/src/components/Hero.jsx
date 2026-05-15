import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TypingText from "./TypingText";
import AnimatedCounter from "./AnimatedCounter";
import TiltCard from "./TiltCard";
import { useLanguage } from "../context/LanguageContext";
import { PROFILE } from "../data/profile";

const stats = [
  { labelKey: "skills", value: 15, suffix: "+" },
  { labelKey: "projects", value: 3, suffix: "+" },
  { labelKey: "years", value: 3, suffix: "" },
];

export default function Hero({ profile }) {
  const { t } = useLanguage();
  const name = profile?.name || "Hamis Kamugisha";
  const title = profile?.title || "Data Scientist";
  const statLabels = {
    skills: t.hero.statSkills,
    projects: t.hero.statProjects,
    years: t.hero.statYears,
  };

  return (
    <section className="section-glow relative min-h-[90vh] overflow-hidden px-4 pb-20 pt-16 md:px-6 md:pt-24">
      <motion.div
        className="absolute right-4 top-32 hidden h-64 w-64 rounded-full border border-emerald-500/20 md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.hero.badge}
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight tracking-tight text-theme md:text-7xl">
            {t.hero.greeting}{" "}
            <span className="gradient-text">{name.split(" ")[0]}</span>
          </h1>

          <p className="mt-4 font-display text-2xl text-theme-muted md:text-3xl">
            <TypingText words={t.hero.typing} className="text-emerald-600 dark:text-emerald-400" />
          </p>

          <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400/90">
            {t.hero.eastc}
          </p>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-theme-muted">
            {profile?.bio ||
              "Data Scientist combining statistics, M&E, finance, and modern analytics for real-world impact."}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/projects" className="btn-glow inline-block">
              {t.hero.ctaProjects}
            </Link>
            <Link to="/contact" className="btn-outline-glow inline-block">
              {t.hero.ctaContact}
            </Link>
            <a href="#skills" className="btn-outline-glow inline-block">
              {t.hero.ctaSkills}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <TiltCard>
            <div className="card-shine gradient-border rounded-3xl p-1">
              <div className="glass-panel-strong rounded-[22px] p-8">
                <motion.div
                  className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 font-display text-4xl font-bold text-zinc-950 shadow-lg shadow-emerald-500/30"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  HK
                </motion.div>
                <h2 className="text-center font-display text-2xl font-bold text-theme">{name}</h2>
                <p className="text-center text-emerald-600 dark:text-emerald-400">{title}</p>
                <p className="mt-1 text-center text-xs text-theme-muted">EASTC · Mzumbe · Rwanda</p>
                <div className="mt-3 flex flex-col items-center gap-1 text-xs">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    {PROFILE.email}
                  </a>
                  <a
                    href={`tel:+255${PROFILE.phone.replace(/^0/, "")}`}
                    className="text-theme-muted hover:text-emerald-500"
                  >
                    {PROFILE.phone}
                  </a>
                </div>

                <motion.div
                  className="mt-8 grid grid-cols-3 gap-3"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                >
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.labelKey}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      whileHover={{ scale: 1.05 }}
                      className="skill-card rounded-xl p-3 text-center transition hover:border-emerald-500/40"
                    >
                      <p className="font-display text-2xl font-bold text-theme">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-theme-muted">{statLabels[stat.labelKey]}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["Python", "M&E", "R", "SQL", "Finance"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-theme-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll down"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.a>
    </section>
  );
}
