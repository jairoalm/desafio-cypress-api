// cypress/e2e/api/users.cy.js

describe("Testes da API de Usuários - Deletar Usuário", () => {
    beforeEach(() => {
        cy.cadastrarNovoUsuario();
    });
    it("Deve deletar usuário por ID", () => {
        cy.get("@user").then((user) => {
            cy.deleteUserId(user.id).then((res) => {
                cy.validarCampoNoBody(res, "message")
                cy.validarResposta(res, 200, "message", "Registro excluído com sucesso")
            });
        })
    });
    it("Tentar deletar usuário com ID inválido", () => {
        cy.deleteUserId("12").then((res) => {
            cy.validarCampoNoBody(res, "message")
            cy.validarResposta(res, 200, "message", "Nenhum registro excluído")
        });
    });
    it("Tentar deletar usuário com ID com números inteiros", () => {
        cy.deleteUserId(12121212121).then((res) => {
            cy.validarCampoNoBody(res, "message")
            cy.validarResposta(res, 200, "message", "Nenhum registro excluído")
        });
    });
    it("Tentar deletar usuário com ID como verdadeiro", () => {
        cy.deleteUserId(true).then((res) => {
            cy.validarCampoNoBody(res, "message")
            cy.validarResposta(res, 200, "message", "Nenhum registro excluído")
        });
    });
    it("Tentar deletar usuário com ID como falso", () => {
        cy.deleteUserId(false).then((res) => {
            cy.validarCampoNoBody(res, "message")
            cy.validarResposta(res, 200, "message", "Nenhum registro excluído")
        });
    });
    it("Tentar deletar usuário que tenha produto no carrinho", () => {
        cy.criarProdutoComCarrinhoEExcluirUsuario();
    })
})