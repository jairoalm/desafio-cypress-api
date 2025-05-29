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
// Cypress.Commands.add("updateUserId", (id, dadosAtualizados) => {
//   return cy.request({
//     method: "PUT",
//     url: `/usuarios/${id}`,
//     failOnStatusCode: false,
//     body: dadosAtualizados,
//   }).then((res) => {
//     return res;
//   });
// });
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

Cypress.Commands.add("loginApi", (email, password) => {
    cy.request({
        method: "POST",
        url: "/login",
        body: {
            email,
            password
        },
        failOnStatusCode: false
    }).then((res) => {
        if (res.status === 200) {
            const tokenCompleto = res.body.authorization;
            expect(tokenCompleto).to.include("Bearer");
            Cypress.env("token", tokenCompleto);
        }
        return res;
    });
});
Cypress.Commands.add("authHeader", () => {
    return {
        Authorization: Cypress.env("token"),
    };
});
Cypress.Commands.add("createProduct", (produto = {}) => {
    const defaultProduto = {
        nome: faker.commerce.productName(),
        preco: 470,
        descricao: "Mouse",
        quantidade: 381
    };

    return cy.request({
        method: "POST",
        url: "/produtos",
        headers: {
            Authorization: Cypress.env("token")
        },
        body: { ...defaultProduto, ...produto }, // permite sobrescrever campos
        failOnStatusCode: false,
    });
});
Cypress.Commands.add("updateProdutoId", (id, override = {}) => {
    const updateProduto = {
        nome: faker.commerce.productName(),
        preco: 470,
        descricao: "Mouse",
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
Cypress.Commands.add("buscarProdutoId", (id) => {
    return cy.request({
        method: "GET",
        url: `/produtos/${id}`,
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});
Cypress.Commands.add("adicionarCarrinho", (produtoId, override = {}) => {
    const defaultCarrinho = {
        produtos: [
            {
                idProduto: produtoId,
                quantidade: 1,
            },
        ],
    };
    const body = {
        ...defaultCarrinho,
        ...override,
    }
    return cy.request({
        method: "POST",
        url: "/carrinhos",
        headers: {
            Authorization: Cypress.env("token")
        },
        body: body,
        failOnStatusCode: false,
    });
});

Cypress.Commands.add("loginUserCommon", () => {
  return cy.createUser({ administrador: "false" }).then((res) => {
    const { email, password } = res.requestBody;
    return cy.loginApi(email, password);
  });
});

Cypress.Commands.add("validacaoStatusCode", (res, statusCode) => {
    expect(res.status).to.eq(statusCode);
})
// Cypress.Commands.add("criarProduto", () => {
//     let user;
//     let produtoId;
//     cy.createUser().then((res) => {
//             const { email, password } = res.requestBody;
//             cy.loginApi(email, password);            
//         });
//         cy.createProduct().then((res) => {
//                 user = res;
//                 produtoId = user.body._id;
//                 cy.adicionarCarrinho(produtoId)
//         });
    // cy.adicionarCarrinho(produtoId).then((res) => {
    //     user = res;
    //     expect(user.status).to.eql(201);
    // });
// })