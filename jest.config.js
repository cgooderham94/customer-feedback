/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/test-utils/setupTests.ts"],
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/?(*.)test.[jt]s?(x)"],
  transform: {
    "\\.(ts|js)x?$": ["ts-jest", { isolatedModules: true }],
  },
};
