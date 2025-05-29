// const { defineConfig } = require("cypress");
import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results", // Define o diretório para os resultados do Allure
      });
      return config; 
    },
  },
});