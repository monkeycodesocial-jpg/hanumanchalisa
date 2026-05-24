import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff8f0",
          100: "#ffedd5",
          200: "#ffd9a8",
          300: "#ffbf70",
          400: "#ff9f3d",
          500: "#f57c00",
          600: "#e65100",
          700: "#bf360c",
          800: "#8d2a0a",
          900: "#5c1a06",
        },
        divine: {
          gold: "#d4af37",
          maroon: "#6b0f1a",
          deep: "#3d0a0f",
          temple: "#1a0a0a",
        },
      },
      fontFamily: {
        devanagari: ["var(--font-devanagari)", "Noto Sans Devanagari", "sans-serif"],
        spiritual: ["var(--font-spiritual)", "Cinzel", "serif"],
      },
      backgroundImage: {
        "divine-gradient":
          "linear-gradient(135deg, #1a0a0a 0%, #3d0a0f 25%, #6b0f1a 50%, #8b2500 75%, #c45c00 100%)",
        "saffron-glow":
          "radial-gradient(ellipse at center, rgba(245,124,0,0.25) 0%, transparent 70%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        flicker: "flicker 2s ease-in-out infinite",
        bell: "bell 4s ease-in-out infinite",
        "ram-float": "ramFloat 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%": { opacity: "0.6", filter: "blur(8px)" },
          "100%": { opacity: "1", filter: "blur(12px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        bell: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        ramFloat: {
          "0%": { transform: "translateX(-100%) translateY(0)" },
          "100%": { transform: "translateX(100vw) translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
