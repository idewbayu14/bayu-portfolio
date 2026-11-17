/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Nunito", "sans-serif"],
      },
      colors: {
        onyx: {
          900: "#0F141E",
          950: "#070A0F",
          card: "#0C1017",
          hover: "#131924",
          border: "#1E2738",
        },
        solar: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "solar-glow": "0 0 25px -5px rgba(245, 158, 11, 0.15)",
        "card-glow": "0 0 30px -10px rgba(15, 23, 42, 0.6)",
      },
    },
  },
  plugins: [],
};

