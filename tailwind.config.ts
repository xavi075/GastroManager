import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
          '50': '#fff2f1',
          '100': '#ffe1df',
          '200': '#ffc8c4',
          '300': '#ffa39c',
          '400': '#ff6c62',
          '500': '#ff3f31',
          '600': '#f02112',
          '700': '#ca180b',
          '800': '#a7170d',
          '900': '#69140e',
          '950': '#4b0904',
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
          '50': '#fcf8ee',
          '100': '#f6eacf',
          '200': '#ecd39b',
          '300': '#e3b966',
          '400': '#dca143',
          '500': '#d58936',
          '600': '#ba6525',
          '700': '#9b4922',
          '800': '#7f3b21',
          '900': '#69311e',
          '950': '#3b180d',
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
  plugins: [nextui()],
};
export default config;
