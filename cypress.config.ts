import { defineConfig } from "cypress";
import { reseed } from "./cypress/tasks/reseed";

export default defineConfig({

  e2e: {
    baseUrl: "http://localhost:3100",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on("task", {
        reseed: reseed


      });
    },
  },
});
