import { faker } from '@faker-js/faker';

describe("Testes da API de Produtos -> Cadastrar Produtos", () => {
    beforeEach(() => {
       cy.login()
    });
    it("Deve criar um novo produto", () => {
        cy.createProduct().then((res) => {
            cy.validarCampoNoBody(res, "message")
            cy.validarCampoNoBody(res, "_id")
            cy.validarResposta(res, 201, "message", "Cadastro realizado com sucesso")
        });
    });
    it("Tentar criar um novo produto com nome vazio", () => {
        cy.createProduct({ nome: "" }).then((res) => {
            cy.validarResposta(res, 400, "nome", "nome não pode ficar em branco")
        });
    });
    it("Tentar criar um novo produto com preco vazio", () => {
        cy.createProduct({ preco: null }).then((res) => {
            cy.validarResposta(res, 400, "preco", "preco deve ser um número")
        });
    });
    it("Tentar criar um novo produto com descricao vazio", () => {
        cy.createProduct({ descricao: "" }).then((res) => {
            cy.validarResposta(res, 400, "descricao", "descricao não pode ficar em branco")
        });
    });
    it("Tentar criar um novo produto com quantidade vazio", () => {
        cy.createProduct({ quantidade: null }).then((res) => {
            cy.validarResposta(res, 400, "quantidade", "quantidade deve ser um número")
        });
    });
    it("Tentar criar um novo produto que o preco tenha casas décimais 13.6", () => {
        cy.createProduct({ preco: 75.63 }).then((res) => {
            cy.validarResposta(res, 400, "preco", "preco deve ser um inteiro")
        });
    });
    it("Tentar criar um novo produto que a quantidade tenha casas décimais 13.6", () => {
        cy.createProduct({ quantidade: 75.63 }).then((res) => {
            cy.validarResposta(res, 400, "quantidade", "quantidade deve ser um inteiro")
        });
    });
    it("Tentar criar produto com nome existente", () => {
        const produtoRepetido = faker.commerce.productName();
        cy.createProduct({ nome: produtoRepetido }).then((res) => {
            expect(res.status).to.eql(201);

            cy.createProduct({ nome: produtoRepetido }).then((res) => {
                cy.validarResposta(res, 400, "message", "Já existe produto com esse nome")
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
            cy.validarResposta(res, 401, "message", "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais")
        });
    });
    it("Deve falhar ao criar produto por não ser admin", () => {
        cy.loginUserCommon();
        cy.createProduct().then((res) => {
            cy.validarResposta(res, 403, "message", "Rota exclusiva para administradores")
        });
    });
})