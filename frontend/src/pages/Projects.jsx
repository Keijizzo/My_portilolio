import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getProjects } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const p = t.projects;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch {
      setError("Could not load projects. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filters = ["all", "python", "react", "django", "r"];
  const filtered =
    filter === "all"
      ? projects
      : projects.filter((proj) =>
          proj.tech_stack?.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="section-glow px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mt-4 font-display text-5xl font-bold text-theme md:text-6xl">
            {p.pageTitle} <span className="gradient-text">{p.pageTitleAccent}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-theme-muted">{p.pageSub}</p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <motion.button
              key={f}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                filter === f
                  ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/30"
                  : "skill-card text-theme-muted hover:text-theme"
              }`}
            >
              {f === "all" ? p.filterAll : f}
            </motion.button>
          ))}
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={load} />}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-theme-muted">{p.noMatch}</p>
        )}
      </div>
    </div>
  );
}
