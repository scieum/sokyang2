import type { Config } from "tailwindcss";

// 자연친화·서정적 톤: 숲의 딥그린, 능선의 어스/모스, 따뜻한 베이지/크림 배경
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f3f7f1",
          100: "#e3ede0",
          200: "#c7dac1",
          300: "#9fbf95",
          400: "#6f9d61",
          500: "#4d7d3f",
          600: "#3a6330",
          700: "#2f4e28",
          800: "#283f23",
          900: "#22341f",
        },
        earth: {
          50: "#faf6ef",
          100: "#f1e7d6",
          200: "#e3cfac",
          300: "#d2b07c",
          400: "#c2935a",
          500: "#b07d45",
          600: "#96643a",
          700: "#794e31",
          800: "#64412e",
          900: "#553829",
        },
        cream: "#fbf8f1",
        moss: "#7d8c5c",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
