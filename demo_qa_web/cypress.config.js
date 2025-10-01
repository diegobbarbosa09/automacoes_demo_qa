const { defineConfig } = require("cypress");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com/",
    viewportHeight: 1080,
    viewportWidth: 1920,
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: false,
    screenshotOnRunFailure: true,
    hideXHR: false, 
    chromeWebSecurity: false,
    experimentalCypressIntercept: true,
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      preprocessor.addCucumberPreprocessorPlugin(on, config);
      return config;
    },
  },
});
