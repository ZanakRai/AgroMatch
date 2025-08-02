/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'lg': '0px 4px 6px rgba(0, 0, 0, 0.4)',
        'md': '0px 2px 4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        circularRotate: "circularRotate 10s linear infinite",
      },
      keyframes: {
        circularRotate: {
          "0%": { transform: "rotateY(0deg) rotateX(-3odeg)" },
          "100%": { transform: "rotateY(360deg) rotateX(-30deg)" },
        },
      },
    },
  },
  plugins: [],
};
