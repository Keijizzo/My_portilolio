import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import ThemeControls from "./ThemeControls";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/#about", label: t.nav.about, hash: true },
    { to: "/#skills", label: t.nav.skills, hash: true },
    { to: "/projects", label: t.nav.projects },
    { to: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) =>
    `relative px-1 py-1 text-sm font-medium transition-colors ${
      isActive ? "text-emerald-500" : "text-theme-muted hover:text-theme"
    }`;

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b shadow-lg backdrop-blur-xl" : ""
      }`}
      style={{
        borderColor: "var(--card-border)",
        backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-2 shrink-0">
          <motion.span
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 font-display text-sm font-bold text-zinc-950"
          >
            HK
          </motion.span>
          <span className="hidden font-display text-lg font-bold text-theme group-hover:text-emerald-500 transition sm:inline">
            Hamis K.
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.hash ? (
              <a
                key={item.to}
                href={item.to}
                className="px-3 py-2 text-sm font-medium text-theme-muted transition hover:text-theme"
              >
                {item.label}
              </a>
            ) : (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-emerald-500"
                      />
                    )}
                  </>
                )}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeControls />
          <Link to="/contact" className="btn-glow !px-4 !py-2 text-sm shrink-0">
            {t.nav.hire}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeControls compact />
          <button
            type="button"
            className="toggle-btn p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t lg:hidden"
            style={{ borderColor: "var(--card-border)", backgroundColor: "var(--nav-bg)" }}
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {navItems.map((item) =>
                item.hash ? (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-theme-muted hover:bg-emerald-500/10"
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-theme-muted hover:bg-emerald-500/10"
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
