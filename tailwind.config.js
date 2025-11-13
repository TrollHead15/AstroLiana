/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D2B55",
        cream: "#F9F6EE",
        gold: "#D4AF37"
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"]
      },
      spacing: {
        section: "32px"
      },
      maxWidth: {
        container: "800px"
      },
      borderRadius: {
        full: "9999px"
      }
    }
  },
  plugins: []
};
