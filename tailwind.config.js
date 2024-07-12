/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        full: "0.5fr 1.5fr 1fr 1fr 1.5fr",
        small: "1fr 3fr 2fr 1fr",
      },
    },
  },
  plugins: [],
};
