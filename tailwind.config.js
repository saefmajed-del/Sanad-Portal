/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#070B14",
        elevated: "#0C1322",
        surface: "#101A2E",
        surfaceHi: "#172645",
        line: "rgba(245, 242, 235, 0.07)",
        lineStrong: "rgba(245, 242, 235, 0.14)",
        paper: {
          50:  "#FAF8F2",
          100: "#F4F0E6",
          200: "#E6DECD",
          300: "#C9BFAB",
          400: "#9A917F",
        },
        ink: {
          1: "#F5F2EB",
          2: "#C7CCD6",
          3: "#7C8598",
          4: "#3E4658",
        },
        navy: {
          900: "#070B14",
          800: "#0C1322",
          700: "#101A2E",
          600: "#172645",
          500: "#1E3461",
        },
        gold: {
          500: "#C4A572",
          400: "#D4B785",
          600: "#A88B5C",
        },
        sa: {
          green:    "#00A86B",
          greenHi:  "#00C281",
        },
        sig: {
          ok:   "#00C281",
          warn: "#E8B339",
          high: "#E5526B",
        },
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', "Tahoma", "sans-serif"],
        serif:  ['"Noto Naskh Arabic"', "serif"],
        sans:   ['"Inter"', "system-ui", "sans-serif"],
        mono:   ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1)",
        "shimmer": "shimmer 2.6s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp:  { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};
