
describe("Testes da API de Usuários - Login", () => {
    let user = {};
    before(() => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody
            user.email = email;
            user.password = password;
        });
    });
    it("Deve fazer login com usuário criado", () => {
        cy.loginApi(user.email, user.password).then((res) => {
            cy.validarCampoNoBody(res, "message")
            cy.validarCampoNoBody(res, "authorization")
            cy.validarResposta(res, 200, "message", "Login realizado com sucesso")

        });
    });
    it("Tentar fazer login com email diferente", () => {
        cy.loginApi("emaildiferente@teste.com", user.password).then((res) => {
            cy.validarResposta(res, 401, "message", "Email e/ou senha inválidos")
        });
    });    
    it("Tentar fazer login com password diferente", () => {
        cy.loginApi(user.email, "123456543").then((res) => {
            cy.validarResposta(res, 401, "message", "Email e/ou senha inválidos")
        });
    });
    it("Tentar fazer login com email sem @", () => {
        cy.loginApi("emaildiferenteteste.com", user.password).then((res) => {
            cy.validarResposta(res, 400, "email", "email deve ser um email válido")
        });
    }); 
    it("Tentar fazer login com email sem dominio", () => {
        cy.loginApi("emaildiferen@", user.password).then((res) => {
            cy.validarResposta(res, 400, "email", "email deve ser um email válido")
        });
    });
    it("Tentar fazer login com email inválido", () => {
        cy.loginApi("@teste.com", user.password).then((res) => {
            cy.validarResposta(res, 400, "email", "email deve ser um email válido")
        });
    });
    it("Tentar fazer login com campos vazios", () => {
        cy.loginApi("","").then((res) => {
            cy.validarResposta(res, 400, "email", "email não pode ficar em branco")
            cy.validarResposta(res, 400, "password", "password não pode ficar em branco")
        });
    });
    it("Tentar fazer login com email vazio", () => {
        cy.loginApi("", user.password).then((res) => {
            cy.validarResposta(res, 400, "email", "email não pode ficar em branco")
            
        });
    });
    it("Tentar fazer login com password vazio", () => {
        cy.loginApi(user.email, "").then((res) => {
            cy.validarResposta(res, 400, "password", "password não pode ficar em branco")
        });
    });
})