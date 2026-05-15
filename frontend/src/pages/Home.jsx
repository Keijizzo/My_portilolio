import { useCallback, useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import ProjectsPreview from "../components/ProjectsPreview";
import Qualifications from "../components/Qualifications";
import { getProfile, getSkills, getProjects } from "../services/api";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState("");
  const [projectsError, setProjectsError] = useState("");

  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    try {
      const { data } = await getProfile();
      setProfile(data);
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const loadSkills = useCallback(async () => {
    setSkillsLoading(true);
    setSkillsError("");
    try {
      const { data } = await getSkills();
      setSkills(data);
    } catch {
      setSkillsError("Could not load skills. Check that the backend is running.");
    } finally {
      setSkillsLoading(false);
    }
  }, []);

  const loadProjects = useCallback(async () => {
    setProjectsLoading(true);
    setProjectsError("");
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch {
      setProjectsError("Could not load projects. Check that the backend is running.");
    } finally {
      setProjectsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
    loadSkills();
    loadProjects();
  }, [loadProfile, loadSkills, loadProjects]);

  return (
    <>
      <Hero profile={profileLoading ? null : profile} />
      <About profile={profile} />
      <Skills
        skills={skills}
        loading={skillsLoading}
        error={skillsError}
        onRetry={loadSkills}
      />
      <ProjectsPreview
        projects={projects}
        loading={projectsLoading}
        error={projectsError}
        onRetry={loadProjects}
      />
      <Qualifications />
    </>
  );
}
