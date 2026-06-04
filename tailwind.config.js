/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B0000", // deep red
        accent: "#C9A96E",  // warm gold
        background: "#FFFFFF",
        surface: "#FDF9F7",
        text: "#1A1A1A",
        border: "#E8E0DC",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
