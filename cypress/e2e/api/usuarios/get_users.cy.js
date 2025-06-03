// cypress/e2e/api/users.cy.js
describe("Testes da API de Usuários -> Buscar Usuários", () => {
    beforeEach(() => {
        cy.cadastrarNovoUsuario()
    });
    it("Deve buscar todos os usuários", () => {
        cy.buscarUser({}).then((res) => {
            cy.validarStatus(res, 200);
            expect(res.body.usuarios[0]).to.have.property("nome");
            expect(res.body.usuarios[0]).to.have.property("email");
            expect(res.body.usuarios[0]).to.have.property("password");
            expect(res.body.usuarios[0]).to.have.property("administrador");
            expect(res.body.usuarios[0]).to.have.property("_id");
        });
    });
    it("Deve buscar o usuário criado pelo nome", () => {
        cy.get("@user").then((user) => {
            cy.buscarUser({ nome: user.nome }).then((res) => {
                cy.validarStatus(res, 200);
                expect(res.body.usuarios[0]).to.have.property("nome", user.nome);
                expect(res.body.usuarios[0].nome).to.include(user.nome);
            });
        });
    });
    it("Deve buscar o usuário criado pelo email", () => {
        cy.get("@user").then((user) => {
            cy.buscarUser({ email: user.email }).then((res) => {
                cy.validarStatus(res, 200);
                expect(res.body.usuarios[0]).to.have.property("email", user.email);
                expect(res.body.usuarios[0].email).to.include(user.email);
            });
        });
    });
    it("Deve buscar o usuário criado pelo password", () => {
        cy.get("@user").then((user) => {
            cy.buscarUser({ password: user.password }).then((res) => {
                cy.validarStatus(res, 200);
                expect(res.body.usuarios[0]).to.have.property("password", user.password);
                expect(res.body.usuarios[0].password).to.include(user.password);
            });
        });
    });
    it("Deve buscar usuários administrador = True", () => {
        cy.buscarUser({ administrador: "true" }).then((res) => {
            cy.validarStatus(res, 200);
            expect(res.body.usuarios[0]).to.have.property("nome");
            expect(res.body.usuarios[0]).to.have.property("email");
            expect(res.body.usuarios[0]).to.have.property("password");
            expect(res.body.usuarios[0]).to.have.property("administrador");
            expect(res.body.usuarios[0]).to.have.property("_id");
        });
    });

    it("Deve buscar usuários administrador = False", () => {
        cy.buscarUser({ administrador: "false" }).then((res) => {
            cy.validarStatus(res, 200);
            expect(res.body.usuarios[0]).to.have.property("nome");
            expect(res.body.usuarios[0]).to.have.property("email");
            expect(res.body.usuarios[0]).to.have.property("password");
            expect(res.body.usuarios[0]).to.have.property("administrador");
            expect(res.body.usuarios[0]).to.have.property("_id");
        });
    });
    it("Buscar o usuário pelo nome inválido", () => {
        cy.buscarUser({ nome: "false" }).then((res) => {
            cy.validarStatus(res, 200);
            expect(res.body.quantidade).to.have.eq(0);
            expect(res.body.usuarios).to.be.an('array').that.is.empty;
        });
    });
    it("Buscar o usuário pelo email inválido", () => {
        cy.buscarUser({ email: "false@false.com" }).then((res) => {
            cy.validarStatus(res, 200);
            expect(res.body.quantidade).to.have.eq(0);
            expect(res.body.usuarios).to.be.an('array').that.is.empty;
        });
    });
    it("Buscar o usuário pelo password inválida", () => {
        cy.buscarUser({ password: "@@##!!@@##_++" }).then((res) => {
            cy.validarStatus(res, 200);
            expect(res.body.quantidade).to.have.eq(0);
            expect(res.body.usuarios).to.be.an('array').that.is.empty;
        });
    });
    it("Buscar o usuário pelo administrador inválido", () => {
        cy.buscarUser({ administrador: "verdadeiro" }).then((res) => {
            cy.validarStatus(res, 400);
        });
    });
})