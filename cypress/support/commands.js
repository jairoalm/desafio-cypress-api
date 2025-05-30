import { faker } from '@faker-js/faker';
Cypress.Commands.add("authHeader", () => {
    return {
        Authorization: Cypress.env("token"),
    };
});
// Commands para token inválido
Cypress.Commands.add("requestInvalidToken", (method, url, expectedMessage) => {
  cy.request({
    method,
    url,
    headers: {
      Authorization: "Bearer token_invalido_123"
    },
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.eql(401);
    expect(res.body.message).to.include(expectedMessage);
  });
});
Cypress.Commands.add("validacaoStatusCode", (res, statusCode) => {
    expect(res.status).to.eq(statusCode);
})
Cypress.Commands.add("criarProdutoComCarrinhoEExcluirUsuario", () => {
    let userId;
    let produtoId;

    return cy.createUser().then((resUser) => {
        const { email, password } = resUser.requestBody;
        userId = resUser.body._id;
        cy.log(userId)
        return cy.loginApi(email, password).then(() => {
            return cy.createProduct().then((resProduto) => {
                produtoId = resProduto.body._id;
                cy.log(produtoId)
                return cy.requestAdicionarCarrinho(produtoId).then(() => {
                    return cy.deleteUserId(userId).then((resDelete) => {
                        expect(resDelete.status).to.eql(400);
                        expect(resDelete.body).to.have.property("message");
                        expect(resDelete.body.message).to.include("Não é permitido excluir usuário com carrinho cadastrado");
                    });
                });
            });
        });
    });
});
