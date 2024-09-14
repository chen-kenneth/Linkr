/** @type {import('tailwindcss').Config} */
module.exports = {
  // Files which will be styled
  // ** means all folders inside /* means all files . means all extensions
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", // Used for the background or main elements
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000", // For the text or icons
          100: "#1E1E2D", // Darker elements or overlays
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0", // For subtle elements like borders or background shading
        },
        green: "#00FF00", // Color for "power on" state (we can add this)
        red: "#FF0000", // Color for "power off" state
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"], // Regular for general text
        pmedium: ["Poppins-Medium", "sans-serif"], // Medium for buttons
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"], // Bold for important text (like the Power button)
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
