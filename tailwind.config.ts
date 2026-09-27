import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        obsidian: "#141414",   // Main Background
        charcoal: "#1C1C1A",   // Secondary Background
        graphite: "#242421",   // Card Background

        // Text
        ivory: "#F2EFE6",      // Primary Text
        stone: "#A6A39A",      // Secondary Text

        // Accents
        copper: "#C47A5A",     // Primary Accent
        olive: "#8C9566",      // Secondary Accent
        sand: "#D6B98C",       // Highlight

        // Borders
        darkstone: "#34342F",  // Borders
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
