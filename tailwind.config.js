/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0d12",
          soft: "#11141b",
          card: "#161a23",
          line: "#222633",
        },
        accent: {
          DEFAULT: "#00d564",
          glow: "#00ff7f",
          ink: "#003d1b",
        },
        ink: {
          DEFAULT: "#e7eaf0",
          mute: "#9aa3b2",
          dim: "#6b7280",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(0,213,100,0.45)",
        card: "0 10px 30px -15px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grad-hero":
          "linear-gradient(135deg, rgba(0,213,100,0.15), rgba(0,0,0,0) 60%), radial-gradient(120% 80% at 80% 0%, rgba(0,213,100,0.18), transparent 60%)",
        "grad-card":
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "slide-up": "slideUp 0.5s ease-out both",
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
