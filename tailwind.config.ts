import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Сканируем ВСЁ в папке src
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // На случай, если папка app вне src
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;