// cypress/e2e/api/users.cy.js
import { faker } from '@faker-js/faker';

describe("Testes da API de Usuários - Login", () => {
    let user = {};
    before(() => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody
            user.email = email;
            user.password = password;
            cy.log(user.email)
        });
    });
    it("Deve fazer login com usuário criado", () => {
        cy.loginApi(user.email, user.password).then((res) => {
            expect(res.status).to.eq(200);
        });
    });
    it("Tentar fazer login com campos vazios", () => {
        cy.loginApi().then((res) => {
            expect(res.status).to.eq(400);
        });
    });
})