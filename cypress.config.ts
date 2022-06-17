import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "r2nme4",
  e2e: {
    "baseUrl": "http://localhost:3000/"
  },
});
