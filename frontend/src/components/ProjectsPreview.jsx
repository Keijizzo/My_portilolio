import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useLanguage } from "../context/LanguageContext";

export default function ProjectsPreview({ projects, loading, error, onRetry }) {
  const { t } = useLanguage();
  const preview = projects.slice(0, 3);

  return (
    <section id="projects" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.projects.title} subtitle={t.projects.subtitle} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={onRetry} />}
        {!loading && !error && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {preview.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
            {projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <Link to="/projects" className="btn-outline-glow inline-block">
                  {t.projects.viewAll}
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
