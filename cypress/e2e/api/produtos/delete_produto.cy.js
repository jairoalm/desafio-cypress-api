describe("Testes da API de Produtos -> Delete Produtos", () => {
    beforeEach(() => {
        cy.cadastrarNovoProduto()
        cy.wrap(1000);
    });
    it("Tentar excluir produto que esteja adicionado ao carrinho", () => {
        cy.get("@produto").then((produto) => {
            cy.requestAdicionarCarrinho(produto.id).then((res) => {
                cy.validarStatus(res, 201);
                cy.deleteProdutoId(produto.id).then((res) => {
                    cy.validarCampoNoBody(res, "message")
                    cy.validarResposta(res, 400, "message", "Não é permitido excluir produto que faz parte de carrinho")
                });
            });
        })
    })
    it("Deletar produto criado", () => {
        cy.get("@produto").then((produto) => {
            cy.deleteProdutoId(produto.id).then((res) => {
                cy.validarCampoNoBody(res, "message")
                cy.validarResposta(res, 200, "message", "Registro excluído com sucesso")
            });
        });
    });
    it("Tentar deletar produto com ID inválido", () => {
        cy.deleteProdutoId("12132123113").then((res) => {
            cy.validarStatus(res, 400);;
        });
    });
    it("Tentar deletar produto com ID null", () => {
        cy.deleteProdutoId(null).then((res) => {
            cy.validarStatus(res, 400);;
        });
    });
    it("Deve falhar ao deletar produto com token inválido", () => {
        cy.get("@produto").then((produto) => {
            cy.request({
                method: "DELETE",
                url: `/produtos/${produto.id}`,
                headers: {
                    Authorization: "Bearer token_invalido_123"
                },
                failOnStatusCode: false,
            }).then((res) => {
                cy.validarResposta(res, 401, "message", "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais")
            });
        })
    });
    it("Deve falhar ao deletar produto por não ser admin", () => {
        cy.loginUserCommon();
        cy.get("@produto").then((produto) => {
            cy.deleteProdutoId(produto.id).then((res) => {
                cy.validarResposta(res, 403, "message", "Rota exclusiva para administradores");
            });
        });
    });
})