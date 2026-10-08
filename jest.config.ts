/** @type {import("jest").Config} */
export default {
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
