import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/../components/$1",
    "^@/services/(.*)$": "<rootDir>/../services/$1"
  }
};

export default config;
