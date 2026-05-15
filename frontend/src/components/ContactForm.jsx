import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContact } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const initialForm = { name: "", email: "", message: "" };

function FloatingInput({ id, label, type = "text", value, onChange, rows }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const InputTag = rows ? "textarea" : "input";

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={{
          y: active ? -22 : 0,
          scale: active ? 0.85 : 1,
        }}
        className="pointer-events-none absolute left-4 top-3.5 origin-left text-sm font-medium text-theme-muted"
        style={{ color: focused ? "#10b981" : undefined }}
      >
        {label}
      </motion.label>
      <InputTag
        id={id}
        name={id}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`input-glow w-full rounded-xl border px-4 transition ${
          rows ? "min-h-[140px] resize-none pt-8" : "py-4 pt-6"
        }`}
      />
    </div>
  );
}

export default function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(c.fillAll);
      setStatus("idle");
      return;
    }

    try {
      await sendContact(form);
      setForm(initialForm);
      setStatus("success");
    } catch (err) {
      const msg =
        err.response?.data?.email?.[0] || err.response?.data?.detail || c.fail;
      setError(typeof msg === "string" ? msg : c.fail);
      setStatus("error");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="card-shine glass-panel-strong mx-auto max-w-xl space-y-6 rounded-3xl p-8 md:p-10"
    >
      <FloatingInput id="name" label={c.name} value={form.name} onChange={handleChange} />
      <FloatingInput id="email" label={c.email} type="email" value={form.email} onChange={handleChange} />
      <FloatingInput id="message" label={c.message} rows={5} value={form.message} onChange={handleChange} />

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-300"
          >
            {c.success}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-glow w-full disabled:opacity-60"
      >
        {status === "loading" ? c.sending : c.send}
      </motion.button>
    </motion.form>
  );
}
