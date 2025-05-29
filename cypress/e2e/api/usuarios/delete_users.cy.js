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

    it("Tentar deletar usuário com ID inválido", () => {
        cy.deleteUserId("12").then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include('Nenhum registro excluído');
        });
    });
    it("Tentar deletar usuário com ID com números", () => {
        cy.deleteUserId(12121212121).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include('Nenhum registro excluído');
        });
    });
    it("Tentar deletar usuário com ID como verdadeiro", () => {
        cy.deleteUserId(true).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include('Nenhum registro excluído');
        });
    });
    it("Tentar deletar usuário com ID como falso", () => {
        cy.deleteUserId(false).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include('Nenhum registro excluído');
        });
    });
    // it.only("Tentar deletar usuário que tenha produto no carrinho", () => {
    //     cy.criarProduto();
    //     cy.deleteUserId(user.id).then((res) => {
    //         user = res
    //         expect(user.status).to.eql(400);
    //         expect(user.body).to.have.property("message");
    //         expect(user.body.message).to.include('Não é permitido excluir produto que faz parte de carrinho');
    //     });
    // })
   
})