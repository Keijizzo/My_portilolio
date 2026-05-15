import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

export const getProfile = () => api.get("/api/profile/");
export const getSkills = () => api.get("/api/skills/");
export const getProjects = () => api.get("/api/projects/");
export const sendContact = (data) => api.post("/api/contact/", data);

export default api;
