/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./store-configs/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // NASEEJ brand palette (ported from the design reference).
        wine: "#6b2637",
        "wine-dark": "#4f1726",
        ink: "#211e1c",
        muted: "#78706a",
        line: "#e8e1d8",
        cream: "#f8f5ef",
        paper: "#fffdf9",
        moss: "#53705a",
        "gold-star": "#b48847",
      },
      fontFamily: {
        sans: ["DMSans_400Regular"],
        "sans-medium": ["DMSans_500Medium"],
        "sans-semibold": ["DMSans_600SemiBold"],
        "sans-bold": ["DMSans_700Bold"],
        display: ["PlayfairDisplay_600SemiBold"],
        "display-italic": ["PlayfairDisplay_600SemiBold_Italic"],
        arabic: ["NotoSansArabic_400Regular"],
        "arabic-medium": ["NotoSansArabic_500Medium"],
        "arabic-semibold": ["NotoSansArabic_600SemiBold"],
        "arabic-bold": ["NotoSansArabic_700Bold"],
      },
      borderRadius: {
        "4xl": "24px",
      },
    },
  },
  plugins: [],
};