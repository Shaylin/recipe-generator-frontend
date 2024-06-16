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
      "dut-cyan": "#83b6b9",
      "dut-magenta": "#83206e",
      "dut-green": "#137f36",
      "dut-red": "#ce141a",
      "dut-blue": "#4b62a1",
      "dut-pink": "#ad6daa"
    }
  },
  plugins: [],
}
export default config
