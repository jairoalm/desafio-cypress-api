// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { faker } from '@faker-js/faker';

// const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add("createUser", (override = {}) => {
  const user = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: "true",
    ...override
  };

  return cy.request({
    method: "POST",
    url: "/usuarios",
    failOnStatusCode: false,
    // headers: {
    //   Authorization: `Bearer ${Cypress.env("token")}`
    // },
    body: user
  }).then((res) => {
    return res;
  });
});