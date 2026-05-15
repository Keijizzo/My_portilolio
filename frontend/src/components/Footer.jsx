import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t px-4 py-12 md:px-6" style={{ borderColor: "var(--card-border)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-theme-muted">
          &copy; {new Date().getFullYear()} Hamis Kamugisha · {t.footer.tag}
        </p>
        <div className="flex gap-6">
          {[
            { to: "/", label: t.nav.home },
            { to: "/projects", label: t.nav.projects },
            { to: "/contact", label: t.nav.contact },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-theme-muted transition hover:text-emerald-500"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xs text-emerald-600 dark:text-emerald-500/80"
        >
          ● {t.footer.api}
        </motion.span>
      </div>
    </footer>
  );
}
