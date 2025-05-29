import { faker } from '@faker-js/faker';

describe("Testes da API de Produtos", () => {
    let user = {}
    let produto = {}
    before(() => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody;
            cy.loginApi(email, password);
        });
        cy.createProduct().then((res) => {
            produto.id = res.body._id;
            produto.nome = res.requestBody.nome;
            produto.preco = res.requestBody.preco;
            produto.descricao = res.requestBody.descricao;
            produto.quantidade = res.requestBody.quantidade;
            cy.log(produto.id)
            cy.log(produto)
            cy.log(produto.preco)
            cy.log(produto.descricao)
            cy.log(produto.quantidade)
        });
    });

    it("Deltar produto criado", () => {
        cy.deleteProdutoId(produto.id).then((res) => {
            user = res;
            user.id = res.body._id;
            expect(user.status).to.eql(200);
            expect(user.body).to.have.property("message");
            expect(user.body.message).to.include('Registro excluído com sucesso');
        });
    });
    it("Tentar deletar produto com ID inválido", () => {
        cy.deleteProdutoId("12132123113").then((res) => {
            user = res;
            user.id = res.body._id;
            expect(user.status).to.eql(400);
            // expect(user.body.message).to.include('Nenhum registro excluído');
        });
    });
    it("Tentar deletar produto com ID null", () => {
        cy.deleteProdutoId(null).then((res) => {
            user = res;
            user.id = res.body._id;
            expect(user.status).to.eql(400);
            // expect(user.body.message).to.include('Nenhum registro excluído');
        });
    });
    it("Deve falhar ao deletar produto com token inválido", () => {
        cy.request({
            method: "DELETE",
            url: `/produtos/${produto.id}`,
            headers: {
                Authorization: "Bearer token_invalido_123"
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eql(401);
            expect(res.body.message).to.include("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
        });
    });
    it("Deve falhar ao deletar produto por não ser admin", () => {
        cy.loginUserCommon();
        cy.createProduct().then((res) => {
            expect(res.status).to.eql(403);
            expect(res.body.message).to.include("Rota exclusiva para administradores");
        });
        cy.deleteProdutoId(produto.id).then((res) => {
            user = res;
            user.id = res.body._id;
            expect(res.status).to.eq(403);
            expect(res.body.message).to.include("Rota exclusiva para administradores");
        });
    });
    it.only("Tentar excluir produto que esteja adicionado ao carrinho", () => {
        cy.adicionarCarrinho(produto.id).then((res) => {
            user = res;
              expect(user.status).to.eql(201);   
        });
        cy.deleteProdutoId(produto.id).then((res) => {
            user = res;
            user.id = res.body._id;
            expect(user.status).to.eql(400);
            expect(user.body).to.have.property("message");
            expect(user.body.message).to.include('Não é permitido excluir produto que faz parte de carrinho');
        });
    })
})