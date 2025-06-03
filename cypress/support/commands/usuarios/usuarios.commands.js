import { faker } from '@faker-js/faker';
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
Cypress.Commands.add("updateUserId", (id, override = {}) => {
    const updateUser = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: "true",
        ...override
    };

    return cy.request({
        method: "PUT",
        url: `/usuarios/${id}`,
        failOnStatusCode: false,
        body: updateUser,
    }).then((res) => {
        return {
            status: res.status,
            body: res.body,
            requestBody: updateUser,
        };
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
Cypress.Commands.add("deleteUserId", (id) => {
    return cy.request({
        method: "DELETE",
        url: `/usuarios/${id}`,
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});

Cypress.Commands.add("cadastrarNovoUsuario", () => {
    const user = {}
    return cy.createUser().then((res) => {
        user.id = res.body._id;
        user.nome = res.requestBody.nome;
        user.email = res.requestBody.email;
        user.password = res.requestBody.password

        cy.wrap(user).as("user");
    });
})

