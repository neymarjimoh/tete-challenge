module.exports = {
  moduleFileExtensions: ["js", "json"],
  testRegex: [".spec.js$", ".test.js$"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  // preset: "@shelf/jest-mongodb", // to avoid conflicting with preset delete testEnvironmet
};
