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
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        obsidian: {
          950: "#050507", // Deepest Apple Black
          900: "#09090B", // Dark Space Gray Card Base
          850: "#111114", // Frosted Glass Card
          800: "#18181B", // Elevated Surface
          700: "#27272A", // Titanium Border
          600: "#3F3F46",
          500: "#52525B",
          400: "#71717A",
          300: "#A1A1AA",
          200: "#E4E4E7",
          100: "#F4F4F5",
        },
        titanium: {
          50: "#FAFAFA",
          100: "#F5F5F7", // Apple Anodized Aluminum White
          200: "#E5E5EA",
          300: "#D1D1D6",
          400: "#A1A1A6", // Apple Mid Titanium Gray
          500: "#86868B", // Apple Subtitle Text
          600: "#636366",
          700: "#48484A",
          800: "#2C2C2E",
          900: "#1C1C1E", // Dark Apple System Gray
        },
      },
      boxShadow: {
        "crystal": "0 0 40px -10px rgba(255, 255, 255, 0.07)",
        "crystal-light": "0 10px 30px -5px rgba(0, 0, 0, 0.05)",
        "specular-dark": "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
        "specular-light": "inset 0 1px 0 0 rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
};
