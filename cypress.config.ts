import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // require('@cypress/code-coverage/task')(on, config) //TODO: reenable once instrumentation is possible on SWC
            // return config

            // implement node event listeners here

        },
        baseUrl: "http://localhost:3000",
    },
});
