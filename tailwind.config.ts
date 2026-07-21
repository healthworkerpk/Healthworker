import type { Config } from "tailwindcss";

// Design tokens straight out of the Healthworkers brief.
// Keep this file as the single source of truth for color / radius / shadow —
// components should reference these tokens, never hardcode hex values.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        ink: "#222222",
        rausch: "#ff385c", // primary brand / CTA color, used sparingly
        "rausch-dark": "#e31c5f",
        "surface-soft": "#f7f7f7",
        "surface-strong": "#f2f2f2",
        hairline: "#dddddd",
      },
      borderRadius: {
        control: "8px", // buttons & inputs
        card: "14px", // cards & containers
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        rating: ["64px", { lineHeight: "1", fontWeight: "700" }],
      },
      boxShadow: {
        card: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px",
      },
      screens: {
        // Overrides Tailwind's default md (768px) so every md: utility in
        // the codebase switches at the brief's 744px mobile→tablet point.
        // Do NOT also introduce a separate "mobilebreak:" prefix elsewhere —
        // that split is what caused the 24px dead zone. One breakpoint, one name.
        md: "744px",
      },
    },
  },
  plugins: [],
};
export default config;
