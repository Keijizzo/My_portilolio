import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { useLanguage } from "../context/LanguageContext";
import { PROFILE } from "../data/profile";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const perks = [
    {
      icon: "📧",
      text: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
    },
    {
      icon: "📱",
      text: PROFILE.phone,
      href: `tel:+255${PROFILE.phone.replace(/^0/, "")}`,
    },
    { icon: "⚡", text: c.perk1 },
    { icon: "🔒", text: c.perk2 },
    { icon: "✉️", text: c.perk3 },
  ];

  return (
    <div className="section-glow px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-display text-5xl font-bold text-theme md:text-6xl">
            {c.title} <span className="gradient-text">{c.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-theme-muted">{c.subtitle}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 lg:col-span-2"
          >
            {perks.map((p, i) => {
              const inner = (
                <>
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-theme-muted break-all">{p.text}</span>
                </>
              );
              return (
                <motion.div
                  key={`${p.text}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="skill-card flex items-center gap-4 rounded-2xl p-4"
                >
                  {p.href ? (
                    <a href={p.href} className="flex items-center gap-4 hover:text-emerald-500">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.div>
              );
            })}
          </motion.div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
