import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
      backgroundImage: {
        grid: "linear-gradient(to right, oklch(var(--bc) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--bc) / 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "20px 20px",
        "grid-lg": "40px 40px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["valentine", "forest"],
  },
};
