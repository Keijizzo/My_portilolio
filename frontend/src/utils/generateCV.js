import { jsPDF } from "jspdf";
import { PROFILE } from "../data/profile";

const baseProfile = {
  name: PROFILE.name,
  title: PROFILE.title,
  email: PROFILE.email,
  phone: PROFILE.phoneDisplay,
  location: PROFILE.location,
  education: [
    "Bachelor in Data Science (in progress) — EASTC, 3rd year",
    "Master in Monitoring & Evaluation (M&E) — Mzumbe University",
    "Bachelor's Degree in Finance — Mzumbe University",
    "Short Course in Health — Rwanda",
  ],
  skills: [
    "Python", "R", "SQL", "Machine Learning", "Statistics",
    "M&E / Impact Evaluation", "Data Visualization", "Financial Analysis",
    "Power BI", "Stata", "Django", "React",
  ],
};

const profileEn = {
  ...baseProfile,
  summary:
    "Data Scientist and 3rd-year student at EASTC (Eastern Africa Statistical Training Centre). " +
    "Combines statistics, M&E, finance, and data science for health and development analytics. " +
    "Master in M&E and Bachelor in Finance from Mzumbe University.",
};

const profileSw = {
  ...baseProfile,
  title: "Mwanasayansi wa Data",
  summary:
    "Mwanasayansi wa Data na mwanafunzi wa mwaka wa 3 EASTC. " +
    "Mchanganyiko wa takwimu, M&E, fedha na sayansi ya data kwa uchambuzi wa afya na maendeleo.",
  education: [
    "Shahada ya Sayansi ya Data (inaendelea) — EASTC, mwaka wa 3",
    "Uzamili katika M&E — Chuo Kikuu cha Mzumbe",
    "Shahada ya Kwanza katika Fedha — Chuo Kikuu cha Mzumbe",
    "Kozi Fupi ya Afya — Rwanda",
  ],
};

export function downloadCV(lang = "en", t) {
  const p = lang === "sw" ? profileSw : profileEn;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  let y = margin;

  const line = (text, size = 10, style = "normal", color = [30, 30, 30]) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, 210 - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * (size * 0.45) + 2;
  };

  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, 210, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(p.name, margin, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(p.title, margin, 26);
  doc.text(`${PROFILE.email}  |  ${PROFILE.phone}`, margin, 33);
  y = 52;

  line(t?.cv?.profile || "Profile", 12, "bold", [16, 185, 129]);
  line(p.summary, 10);

  line(t?.cv?.education || "Education", 12, "bold", [16, 185, 129]);
  p.education.forEach((e) => line(`• ${e}`, 10));

  y += 2;
  line(t?.cv?.skills || "Skills", 12, "bold", [16, 185, 129]);
  line(p.skills.join("  •  "), 10);

  y += 2;
  line(t?.cv?.contact || "Contact", 12, "bold", [16, 185, 129]);
  line(`${p.email}  |  ${p.phone}  |  ${p.location}`, 10);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated from portfolio — ${PROFILE.name}`, margin, 285);

  const fileName = t?.cv?.fileName || "Hamis_Kamugisha_CV.pdf";
  doc.save(fileName);
}
