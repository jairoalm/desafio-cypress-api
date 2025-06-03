// cypress/e2e/api/users.cy.js
import { faker } from '@faker-js/faker';

describe("Testes da API de Produtos -> Editar Produto", () => {
    beforeEach(() => {
        cy.cadastrarNovoProduto()
    });
    it("Deve atualizar apenas o nome do produto", () => {
        cy.get("@produto").then((produto) => {
            const novoNome = faker.commerce.productName();
            cy.updateProdutoId(produto.id, { nome: novoNome }).then((res) => {
                cy.validarCampoNoBody(res, "message")
                cy.validarResposta(res, 200, "message", "Registro alterado com sucesso")
            });
        })
    });
    it("Deve atualizar apenas o preco do produto", () => {
        cy.get("@produto").then((produto) => {
            const novoPreco = faker.commerce.price({ min: 100, max: 200, dec: 0 })
            cy.updateProdutoId(produto.id, { preco: novoPreco }).then((res) => {
                cy.validarResposta(res, 200, "message", "Registro alterado com sucesso")
            });
        });
    });
    it("Deve atualizar apenas descrição do produto", () => {
        cy.get("@produto").then((produto) => {
            const novaDescricao = faker.commerce.productDescription();
            cy.updateProdutoId(produto.id, { descricao: novaDescricao }).then((res) => {
                cy.validarResposta(res, 200, "message", "Registro alterado com sucesso")
            });
        })
    });
    it("Deve atualizar apenas a quantidade do produto", () => {
        cy.get("@produto").then((produto) => {
            const novaQuantidade = faker.commerce.price({ min: 100, max: 200, dec: 0 })
            cy.updateProdutoId(produto.id, { quantidade: novaQuantidade }).then((res) => {
                cy.validarResposta(res, 200, "message", "Registro alterado com sucesso")
            });
        });
    });
    it("Tentar editar produto com nome vazio", () => {
        cy.get("@produto").then((produto) => {
            cy.updateProdutoId(produto.id, { nome: "" }).then((res) => {
                cy.validarResposta(res, 400, "nome", "nome não pode ficar em branco")
            });
        });
    });
    it("Tentar editar produto com preço vazio", () => {
        cy.get("@produto").then((produto) => {
            cy.updateProdutoId(produto.id, { preco: null }).then((res) => {
                cy.validarResposta(res, 400, "preco", "preco deve ser um número")
            });
        })
    });
    it("Tentar editar produto com descrição vazia", () => {
        cy.get("@produto").then((produto) => {
            cy.updateProdutoId(produto.id, { descricao: "" }).then((res) => {
                cy.validarResposta(res, 400, "descricao", "descricao não pode ficar em branco")
            });
        });
    });
    it("Tentar editar produto com quantidade vazia", () => {
        cy.get("@produto").then((produto) => {
            cy.updateProdutoId(produto.id, { quantidade: null }).then((res) => {
                cy.validarResposta(res, 400, "quantidade", "quantidade deve ser um número")
            });
        });
    });
    it("Tentar editar um novo produto que o preco tenha casas décimais 13.6", () => {
        cy.get("@produto").then((produto) => {
            const editarPreco = 132.23
            cy.createProduct({ preco: editarPreco }).then((res) => {
                cy.validarResposta(res, 400, "preco", "preco deve ser um inteiro")
            });
        });
    });
    it("Tentar editar um novo produto que a quantidade tenha casas décimais 13.6", () => {
        const editarQuantidade = 132.23
        cy.get("@produto").then((produto) => {
            cy.createProduct({ quantidade: editarQuantidade }).then((res) => {
                cy.validarResposta(res, 400, "quantidade", "quantidade deve ser um inteiro")
            });
        })
    });
    it("Deve falhar ao editar produto com token inválido", () => {
        const produtoFixo = {
            nome: "Produto Token Inválido",
            preco: 100,
            descricao: "Descrição teste",
            quantidade: 10
        };
        cy.get("@produto").then((produto) => {
            cy.request({
                method: "PUT",
                url: `/produtos/${produto.id}`,
                headers: {
                    Authorization: "Bearer token_invalido_123"
                },
                body: produtoFixo,
                failOnStatusCode: false,
            }).then((res) => {
                cy.validarResposta(res, 401, "message", "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais")
            });
        });
    });
    it("Deve falhar ao editar produto por não ser admin", () => {
        cy.loginUserCommon();
        cy.get("@produto").then((produto) => {
            const novoNome = faker.commerce.productName();
            cy.updateProdutoId(produto.id, { nome: novoNome }).then((res) => {
                cy.validarResposta(res, 403, "message", "Rota exclusiva para administradores")
            });
        });
    });
})