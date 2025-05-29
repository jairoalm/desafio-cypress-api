// cypress/e2e/api/users.cy.js
import { faker } from '@faker-js/faker';

describe("Testes da API de Usuários -> Editar Usuário", () => {
    let produto = {};
    let user = {}
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
    it("Deve atualizar apenas o nome do produto", () => {
        const novoNome = faker.commerce.productName();

        cy.updateProdutoId(produto.id, { nome: novoNome }).then((res) => {
            cy.log(novoNome)
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Registro alterado com sucesso");
        });
    });
    it("Deve atualizar apenas o preco do produto", () => {
        const novoPreco = faker.commerce.price({ min: 100, max: 200, dec: 0 })
        cy.log(novoPreco)
        cy.updateProdutoId(produto.id, { preco: novoPreco }).then((res) => {
            cy.log(novoPreco)
            // expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Registro alterado com sucesso");
        });
    });
    it("Deve atualizar apenas descrição do produto", () => {
        const novaDescricao = faker.commerce.productDescription();
        cy.log(novaDescricao)
        cy.updateProdutoId(produto.id, { descricao: novaDescricao }).then((res) => {
            cy.log(novaDescricao)
            // expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Registro alterado com sucesso");
        });
    });
    it("Deve atualizar apenas a quantidade do produto", () => {
        const novaQuantidade = faker.commerce.price({ min: 100, max: 200, dec: 0 })
        cy.log(novaQuantidade)
        cy.updateProdutoId(produto.id, { quantidade: novaQuantidade }).then((res) => {
            cy.log(novaQuantidade)
            // expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Registro alterado com sucesso");
        });
    });
    it("Tentar editar produto com nome vazio", () => {
        cy.updateProdutoId(produto.id, { nome: "" }).then((res) => {
            user = res;
            expect(user.status).to.eql(400);
            expect(user.body.nome).to.include('nome não pode ficar em branco');
        });
    });
    it("Tentar editar produto com preço vazio", () => {
        cy.updateProdutoId(produto.id, { preco: null }).then((res) => {
            user = res;
            expect(user.status).to.eql(400);
            expect(user.body.preco).to.include('preco deve ser um número');
        });
    });
    it("Tentar editar produto com descrição vazia", () => {
        cy.updateProdutoId(produto.id, { descricao: "" }).then((res) => {
            user = res;
            expect(user.status).to.eql(400);
            expect(user.body.descricao).to.include('descricao não pode ficar em branco');
        });
    });
    it("Tentar editar produto com quantidade vazia", () => {
        cy.updateProdutoId(produto.id, { quantidade: null }).then((res) => {
            user = res;
            expect(user.status).to.eql(400);
            expect(user.body.quantidade).to.include('quantidade deve ser um número');
        });
    });
    it("Tentar editar um novo produto que o preco tenha casas décimais 13.6", () => {
        const editarPreco = 132.23
        cy.createProduct({ preco: editarPreco }).then((res) => {
            user = res;
            expect(user.status).to.eql(400);
            expect(user.body.preco).to.include('preco deve ser um inteiro');
        });
    });
    it("Tentar editar um novo produto que a quantidade tenha casas décimais 13.6", () => {
        const editarQuantidade = 132.23
        cy.createProduct({ quantidade: editarQuantidade }).then((res) => {
            user = res;
            expect(user.status).to.eql(400);
            expect(user.body.quantidade).to.include('quantidade deve ser um inteiro');
        });
    });
    it("Deve falhar ao editar produto com token inválido", () => {
        const produtoFixo = {
            nome: "Produto Token Inválido",
            preco: 100,
            descricao: "Descrição teste",
            quantidade: 10
        };

        cy.request({
            method: "PUT",
            url: `/produtos/${produto.id}`,
            headers: {
                Authorization: "Bearer token_invalido_123"
            },
            body: produtoFixo,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eql(401);
            expect(res.body.message).to.include("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
        });
    });
    it("Deve falhar ao editar produto por não ser admin", () => {
        cy.loginUserCommon();
        cy.createProduct().then((res) => {
            expect(res.status).to.eql(403);
            expect(res.body.message).to.include("Rota exclusiva para administradores");
        });
        const novoNome = faker.commerce.productName();

        cy.updateProdutoId(produto.id, { nome: novoNome }).then((res) => {
            cy.log(novoNome)
            expect(res.status).to.eq(403);
            expect(res.body.message).to.include("Rota exclusiva para administradores");
        });
    });
})