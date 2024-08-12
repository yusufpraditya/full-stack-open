/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        toast: {
          "0%": {
            opacity: "0",
          },
          "5%": {
            transform: "translateY(-48px)",
            opacity: "1",
          },
          "95%": {
            transform: "translateY(-48px)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: "0",
          },
        },
      },
      animation: {
        toast: "toast 5s ease-in-out",
      },
    },
  },
  plugins: [],
};
