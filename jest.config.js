/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/test-utils/setupTests.ts"],
  testEnvironment: "jsdom",
};
