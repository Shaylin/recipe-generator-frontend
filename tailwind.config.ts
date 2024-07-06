import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      width: {
        "128": "32rem"
      },
      height: {
        "16": "4rem"
      },
      minWidth: {
        "40": "10rem"
      }
    },
    colors: {
      "light-tone": "#F2E9D0",
      "muted-tone": "#CFD9CF",
      "bright-tone": "#CE141A",
      "highlight-tone": "#3F718D",
      "dark-tone": "#283641",
      "white": "#FFFFFF"
    }
  },
  plugins: [],
}
export default config
