Cypress.Commands.add("requestAdicionarCarrinho", (produtoId, override = {}) => {
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
Cypress.Commands.add("requestConcluirCompraNoCarrinho", () => {
    return cy.request({
        method: "DELETE",
        url: `/carrinhos/concluir-compra`,
        headers: {
            Authorization: Cypress.env("token")
        },
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});
Cypress.Commands.add("requestCancelarCompraNoCarrinho", () => {
    return cy.request({
        method: "DELETE",
        url: `/carrinhos/cancelar-compra`,
        headers: {
            Authorization: Cypress.env("token")
        },
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});

Cypress.Commands.add("requestBuscaCarrinho", (filtros = {}) => {
    const queryParams = Object.entries(filtros)
        .map(([chave, valor]) => `${chave}=${encodeURIComponent(valor)}`)
        .join("&");
    return cy.request({
        method: "GET",
        url: `/carrinhos?${queryParams}`,
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});
Cypress.Commands.add("requestBuscaCarrinhoId", (id) => {
    return cy.request({
        method: "GET",
        url: `/carrinhos/${id}`,
        failOnStatusCode: false,
    }).then((res) => {
        return res;
    });
});
Cypress.Commands.add("criarUsuarioProdutoECarrinho", () => {
    let contexto = {};
    return cy.createUser().then((resUser) => {
        contexto.userId = resUser.body._id;
        const { email, password } = resUser.requestBody;
        contexto.email = email;
        contexto.password = password;
        return cy.loginApi(email, password).then(() => {
            cy.log("id_user", contexto.userId);
            return cy.createProduct().then((resProd) => {
                contexto.produtoId = resProd.body._id;
                return cy.requestAdicionarCarrinho(contexto.produtoId).then((resCarrinho) => {
                    contexto.carrinhoId = resCarrinho.body._id;
                    cy.log("id_carrinho", contexto.carrinhoId);
                    return cy.wrap(contexto);
                });
            });
        });
    });
});