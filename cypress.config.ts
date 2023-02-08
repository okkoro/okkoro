import { defineConfig } from "cypress";
require('dotenv').config()
export default defineConfig({
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // require('@cypress/code-coverage/task')(on, config) //TODO: reenable once instrumentation is possible on SWC
      // return config
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
