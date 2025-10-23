import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D2B55",
        background: "#F9F6EE",
        accent: "#D4AF37",
        foreground: "#171717",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        display: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
        h1: "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
        h2: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)",
        h3: "clamp(1.5rem, 2.5vw + 0.5rem, 2rem)",
        "body-lg": "clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)",
        body: "clamp(1rem, 1vw + 0.5rem, 1.125rem)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
export default config;
