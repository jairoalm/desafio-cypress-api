import { faker } from '@faker-js/faker';

Cypress.Commands.add("createProduct", (override = {}) => {
    const defaultProduto = {
        nome: faker.commerce.productName(),
        preco: 470,
        descricao: "Mouse",
        quantidade: 1,
        ...override
    };
    return cy.request({
        method: "POST",
        url: "/produtos",
        headers: {
            Authorization: Cypress.env("token")
        },
        failOnStatusCode: false,
        body: defaultProduto,
    }).then((res) => {
        return {
            status: res.status,
            body: res.body,
            requestBody: defaultProduto,
        };
    });
});
Cypress.Commands.add("updateProdutoId", (id, override = {}) => {
    const updateProduto = {
        nome: faker.commerce.productName(),
        preco: 470,
        descricao: faker.commerce.productDescription(),
        quantidade: 381,
        ...override
    };
    return cy.request({
        method: "PUT",
        url: `/produtos/${id}`,
        headers: {
            Authorization: Cypress.env("token")
        },
        failOnStatusCode: false,
        body: updateProduto,
    }).then((res) => {
        return {
            status: res.status,
            body: res.body,
            requestBody: updateProduto,
        };
    });
});
Cypress.Commands.add("deleteProdutoId", (id) => {
    return cy.request({
        method: "DELETE",
        url: `/produtos/${id}`,
        headers: {
            Authorization: Cypress.env("token")
        },
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});
Cypress.Commands.add("buscarProduto", (filtros = {}) => {
    const queryParams = Object.entries(filtros)
        .map(([chave, valor]) => `${chave}=${encodeURIComponent(valor)}`)
        .join("&");
    return cy.request({
        method: "GET",
        url: `/produtos?${queryParams}`,
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});
Cypress.Commands.add("buscarProdutoId", (id) => {
    return cy.request({
        method: "GET",
        url: `/produtos/${id}`,
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});
Cypress.Commands.add("cadastrarNovoProduto", () => {
    const produto = {}
    return cy.createUser().then((res) => {
        const { email, password } = res.requestBody;
        return cy.loginApi(email, password).then(() => {
            return cy.createProduct().then((resProd) => {
                produto.id = resProd.body._id;
                produto.nome = resProd.requestBody.nome;
                produto.preco = resProd.requestBody.preco;
                produto.descricao = resProd.requestBody.descricao;
                produto.quantidade = resProd.requestBody.quantidade;
                cy.log(JSON.stringify(produto));
                cy.log(JSON.stringify(res.body));

                cy.wrap(produto).as("produto");
                return cy.wrap(produto);
            });
        })
    });
})