// cypress/e2e/api/users.cy.js

describe("Testes da API de Usuários - Deletar Usuário", () => {
    let user = {};
    before(() => {
        cy.createUser().then((res) => {
            user.id = res.body._id;
            user.nome = res.requestBody.nome;
            user.email = res.requestBody.email;
            user.password = res.requestBody.password
            cy.log(user.id)
        });
    });
    it("Deve deletar usuário por ID", () => {
        cy.deleteUserId(user.id).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include('Registro excluído com sucesso');
        });
    });
    
    it.only("Tentar deletar usuário com ID vazio", () => {
        cy.deleteUserId().then((res) => {
            expect(res.status).to.eq(400);
        });
    });
    it("Tentar deletar usuário com ID incorreto", () => {
        cy.deleteUserId("1234567890jmkloi").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.include('Usuário não encontrado');
        });
    });
    it("Tentar deletar usuário com ID menos de 16 caracteres alfanuméricos", () => {
        cy.deleteUserId("1234567890jmklo").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.id).to.include('id deve ter exatamente 16 caracteres alfanuméricos');
        });
    });
})