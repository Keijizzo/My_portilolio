import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { downloadCV } from "../utils/generateCV";

export default function ThemeControls({ compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  const handleCv = () => downloadCV(lang, t);

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="toggle-btn"
          title={theme === "dark" ? t.theme.light : t.theme.dark}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: "var(--card-border)" }}>
          {["en", "sw"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`toggle-btn rounded-none border-0 px-2.5 ${
                lang === code ? "toggle-btn-active" : ""
              }`}
            >
              {t.lang[code]}
            </button>
          ))}
        </div>
        <button type="button" onClick={handleCv} className="toggle-btn">
          📄 CV
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={toggleTheme} className="toggle-btn flex items-center gap-1.5">
        <span>{theme === "dark" ? "☀️" : "🌙"}</span>
        <span>{theme === "dark" ? t.theme.light : t.theme.dark}</span>
      </button>
      <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: "var(--card-border)" }}>
        {["en", "sw"].map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={`toggle-btn rounded-none border-0 px-3 py-1.5 ${
              lang === code ? "toggle-btn-active" : ""
            }`}
          >
            {code === "en" ? "English" : "Kiswahili"}
          </button>
        ))}
      </div>
      <button type="button" onClick={handleCv} className="btn-outline-glow !px-4 !py-2 text-sm">
        📄 {t.nav.cv}
      </button>
    </div>
  );
}
