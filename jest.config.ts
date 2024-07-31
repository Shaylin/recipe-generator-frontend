import type { Config } from "jest"
import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and ..env files in your test environment
  dir: "./",
})


// Add any custom config to be passed to Jest
const config: Config = {
  collectCoverage: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/services/(.*)$": "<rootDir>/services/$1",
    "^@/app/(.*)$": "<rootDir>/../../app/$1"
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "./app/api/",
    "./services"
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)