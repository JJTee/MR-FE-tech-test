/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-bg": "#f6f6f7",
        "font-color": "#222222",
        "font-color-light": "#888888",
        "required-star": "#c90000",
        "border-light-grey": "#cccccc",
        "border-dark-grey": "#222222",
      },
    },
  },
  plugins: [],
};
