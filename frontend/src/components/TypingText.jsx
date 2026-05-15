import { useEffect, useState } from "react";

export default function TypingText({ words, className = "" }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < current.length) {
            setText(current.slice(0, text.length + 1));
          } else {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-emerald-400 align-middle" />
    </span>
  );
}
