// cypress/e2e/api/users.cy.js
describe("Testes da API de Usuários - Busca Usuários Por ID", () => {
    beforeEach(() => {
        cy.cadastrarNovoUsuario()
    });
    it("Deve buscar por ID do usuário e validar propriedade do responde body", () => {
        cy.get("@user").then((user) => {
            cy.buscarUserId(user.id).then((res) => {
                cy.validarStatus(res, 200);
                cy.validarCampoNoBody(res, "nome");
                cy.validarCampoNoBody(res, "email");
                cy.validarCampoNoBody(res, "password");
                cy.validarCampoNoBody(res, "administrador");
                cy.validarCampoNoBody(res, "_id");
            });
        });
    });
    it("Deve buscar por ID do usuário e validar nome", () => {
        cy.get("@user").then((user) => {
            cy.buscarUserId(user.id).then((res) => {
                cy.validarResposta(res, 200, "nome", user.nome);
            });
        });
    });
    it("Deve buscar por ID do usuário e validar email", () => {
        cy.get("@user").then((user) => {
            cy.buscarUserId(user.id).then((res) => {
                cy.validarResposta(res, 200, "email", user.email);
            });
        });
    });
    it("Validar busca por ID do usuário vazio", () => {
        cy.buscarUserId().then((res) => {
            cy.validarStatus(res, 400);
        });
    });
    it("Validar busca por usuário com ID incorreto", () => {
        cy.buscarUserId("1234567890jmkloi").then((res) => {
            cy.validarResposta(res, 400, "message", "Usuário não encontrado");
        });
    });
    it("Validar busca por ID usuário com menos de 16 caracteres alfanuméricos", () => {
        cy.buscarUserId("1234567890jmklo").then((res) => {
            cy.validarResposta(res, 400, "id", "id deve ter exatamente 16 caracteres alfanuméricos");
        });
    });
})