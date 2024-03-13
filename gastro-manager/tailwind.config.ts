import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black_bean: {
          DEFAULT: '#3c1518',
          100: '#0c0405',
          200: '#18080a',
          300: '#240d0f',
          400: '#301114',
          500: '#3c1518',
          600: '#7c2b32',
          700: '#bb424c',
          800: '#d28087',
          900: '#e9c0c3',
        },
        blood_red: {
          DEFAULT: '#69140e',
          100: '#150403',
          200: '#290806',
          300: '#3e0c08',
          400: '#53100b',
          500: '#69140e',
          600: '#ac2118',
          700: '#e33c30',
          800: '#ec7d75',
          900: '#f6beba',
        },
        brown: {
          DEFAULT: '#a44200',
          100: '#210d00',
          200: '#411a00',
          300: '#622700',
          400: '#833400',
          500: '#a44200',
          600: '#e95d00',
          700: '#ff822f',
          800: '#ffac74',
          900: '#ffd5ba',
        },
        bronze: {
          DEFAULT: '#d58936',
          100: '#2c1b09',
          200: '#583613',
          300: '#83511c',
          400: '#af6c25',
          500: '#d58936',
          600: '#dd9f5d',
          700: '#e5b786',
          800: '#eecfae',
          900: '#f6e7d7',
        },
        vanilla: {
          DEFAULT: '#f2f3ae',
          100: '#48490b',
          200: '#8f9216',
          300: '#d7da21',
          400: '#e6e866',
          500: '#f2f3ae',
          600: '#f5f5bf',
          700: '#f7f8cf',
          800: '#fafadf',
          900: '#fcfdef',
        },
      }
    },
  },
  plugins: [],
};
export default config;
