import { faker } from '@faker-js/faker';

describe("Testes da API de Produtos", () => {
    let produto;
    before(() => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody;
            cy.loginApi(email, password);
        });
    });

    it("Deve criar um novo produto", () => {
        cy.createProduct().then((res) => {
            produto = res;
            produto.id = res.body._id;
            expect(produto.status).to.eql(201);
            expect(produto.body).to.have.property("message");
            expect(produto.body).to.have.property("_id");
            expect(produto.body.message).to.include('Cadastro realizado com sucesso');
        });
    });
    it("Tentar criar um novo produto com nome vazio", () => {
        cy.createProduct({ nome: "" }).then((res) => {
            produto = res;
            expect(produto.status).to.eql(400);
            expect(produto.body.nome).to.include('nome não pode ficar em branco');
        });
    });
    it("Tentar criar um novo produto com preco vazio", () => {
        cy.createProduct({ preco: null }).then((res) => {
            produto = res;
            expect(produto.status).to.eql(400);
            expect(produto.body.preco).to.include('preco deve ser um número');
        });
    });
    it("Tentar criar um novo produto com descricao vazio", () => {
        cy.createProduct({ descricao: "" }).then((res) => {
            produto = res;
            expect(produto.status).to.eql(400);
            expect(produto.body.descricao).to.include('descricao não pode ficar em branco');
        });
    });
    it("Tentar criar um novo produto com quantidade vazio", () => {
        cy.createProduct({ quantidade: null }).then((res) => {
            produto = res;
            expect(produto.status).to.eql(400);
            expect(produto.body.quantidade).to.include('quantidade deve ser um número');
        });
    });
     it("Tentar criar um novo produto que o preco tenha casas décimais 13.6", () => {
        cy.createProduct({ preco: 75.63 }).then((res) => {
            produto = res;
            expect(produto.status).to.eql(400);
            expect(produto.body.preco).to.include('preco deve ser um inteiro');
        });
    });
    it("Tentar criar um novo produto que a quantidade tenha casas décimais 13.6", () => {
        cy.createProduct({ quantidade: 75.63 }).then((res) => {
            produto = res;
            expect(produto.status).to.eql(400);
            expect(produto.body.quantidade).to.include('quantidade deve ser um inteiro');
        });
    });
    it("Tentar criar produto com nome existente", () => {
        const produtoRepetido = faker.commerce.productName();
        cy.createProduct({ nome: produtoRepetido }).then((res) => {
            expect(res.status).to.eql(201);

            cy.createProduct({ nome: produtoRepetido }).then((res) => {
                produto = res;
                expect(produto.status).to.eql(400);
                expect(produto.body.message).to.include('Já existe produto com esse nome');
            });
        })
    });
    it("Deve falhar ao criar produto com token inválido", () => {
        const produtoFixo = {
            nome: "Produto Token Inválido",
            preco: 100,
            descricao: "Descrição teste",
            quantidade: 10
        };

        cy.request({
            method: "POST",
            url: "/produtos",
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
    it("Deve falhar ao criar produto por não ser admin", () => {
        cy.loginUserCommon();
        cy.createProduct().then((res) => {
            expect(res.status).to.eql(403);
            expect(res.body.message).to.include("Rota exclusiva para administradores");
        });
    });
})