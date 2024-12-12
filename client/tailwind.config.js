/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        dotted: "radial-gradient(circle, #313434 2px, transparent 1px)",
        custom:
          "linear-gradient(90deg, hsla(335, 91%, 70%, 1) 0%, hsla(18, 92%, 50%, 1) 100%)",
      },
      backgroundSize: {
        dots: "20px 20px", // Adjust size as needed
      },
    },
  },
  plugins: [],
};
