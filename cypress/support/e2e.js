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
import 'cypress-mochawesome-reporter/register';
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
    body: user,
  }).then((res) => {
    return {
        status: res.status,
        body: res.body,
        requestBody: user,
    }
  });
});
Cypress.Commands.add("buscarUser", (filtros = {}) => {
    const queryParams = Object.entries(filtros)
    .map(([chave, valor]) => `${chave}=${encodeURIComponent(valor)}`)
    .join("&");
  return cy.request({
    method: "GET",
    url: `/usuarios?${queryParams}`,
    failOnStatusCode: false,
  }).then((res) => {
    return res;
  });
});
Cypress.Commands.add("buscarUserId", (id) => {
  return cy.request({
    method: "GET",
    url: `/usuarios/${id}`,
    failOnStatusCode: false,
  }).then((res) => {
    return res;
  });
});
