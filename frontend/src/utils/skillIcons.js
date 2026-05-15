const iconMap = {
  python: "🐍",
  sql: "🗄️",
  machine: "🤖",
  learning: "🧠",
  pandas: "📊",
  numpy: "🔢",
  visualization: "📈",
  django: "⚡",
  react: "⚛️",
  cloud: "☁️",
  r: "📐",
  stata: "📉",
  finance: "💰",
  power: "📊",
  research: "🔬",
  health: "🏥",
  default: "✦",
};

export function getSkillIcon(name) {
  const key = name.toLowerCase();
  for (const [k, icon] of Object.entries(iconMap)) {
    if (key.includes(k)) return icon;
  }
  return iconMap.default;
}
