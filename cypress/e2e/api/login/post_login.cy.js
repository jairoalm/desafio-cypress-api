// cypress/e2e/api/users.cy.js
describe("Testes da API de Usuários - Login", () => {
    let user = {};
    before(() => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody
            user.email = email;
            user.password = password;
            cy.log(user.email)
            cy.log(user.password)
        });
    });
    it("Deve fazer login com usuário criado", () => {
        cy.loginApi(user.email, user.password).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Login realizado com sucesso")
        });
    });
    it("Tentar fazer login com email diferente", () => {
        cy.loginApi("emaildiferente@teste.com", user.password).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body.message).to.include("Email e/ou senha inválidos")
        });
    });    
    it("Tentar fazer login com password diferente", () => {
        cy.loginApi(user.email, "123456543").then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body.message).to.include("Email e/ou senha inválidos")
        });
    });
    it("Tentar fazer login com email sem @", () => {
        cy.loginApi("emaildiferenteteste.com", user.password).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.email).to.include("email deve ser um email válido")
        });
    }); 
    it("Tentar fazer login com email sem dominio", () => {
        cy.loginApi("emaildiferen@", user.password).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.email).to.include("email deve ser um email válido")
        });
    });
    it("Tentar fazer login com email inválido", () => {
        cy.loginApi("@teste.com", user.password).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.email).to.include("email deve ser um email válido")
        });
    });
    it("Tentar fazer login com campos vazios", () => {
        cy.loginApi("","").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.email).to.include("email não pode ficar em branco")
            expect(res.body.password).to.include("password não pode ficar em branco")
        });
    });
    it("Tentar fazer login com email vazio", () => {
        cy.loginApi("", user.password).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.email).to.include("email não pode ficar em branco")
        });
    });
    it("Tentar fazer login com password vazio", () => {
        cy.loginApi(user.email, "").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.password).to.include("password não pode ficar em branco")
        });
    });
})