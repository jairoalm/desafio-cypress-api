// cypress/e2e/api/users.cy.js
import { faker } from '@faker-js/faker';

describe("Testes da API de Usuários", () => {
    let user = {};
    before(() => {
        cy.createUser().then((res) => {
            user.id = res.body._id;
            user.nome = res.requestBody.nome;
            user.email = res.requestBody.email;
            user.password = res.requestBody.password
        });
    });
    it("Deve buscar por ID do usuário e validar propriedade do responde body", () => {
        cy.buscarUserId(user.id).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("nome");
            expect(res.body).to.have.property("email");
            expect(res.body).to.have.property("password");
            expect(res.body).to.have.property("administrador");
            expect(res.body).to.have.property("_id");
        });
    });
    it("Deve buscar por ID do usuário e validar nome", () => {
        cy.buscarUserId(user.id).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.nome).to.include(user.nome);
        });
    });
    it("Deve buscar por ID do usuário e validar email", () => {
        cy.buscarUserId(user.id).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.email).to.include(user.email);
        });
    });
    it("Validar busca por ID do usuário vazio", () => {
        cy.buscarUserId().then((res) => {
            expect(res.status).to.eq(400);
        });
    });
    it("Validar busca por usuário com ID incorreto", () => {
        cy.buscarUserId("1234567890jmkloi").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.include('Usuário não encontrado');
        });
    });
    it("Validar busca por ID usuário com menos de 16 caracteres alfanuméricos", () => {
        cy.buscarUserId("1234567890jmklo").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.id).to.include('id deve ter exatamente 16 caracteres alfanuméricos');
        });
    });
})