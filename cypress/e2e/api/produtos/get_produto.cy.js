import { faker } from "@faker-js/faker";

describe("Testes da API de Usuários", () => {
    let produto = {};
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
        });
    });
    it("Deve buscar todos os produtos", () => {
        cy.buscarProduto({ }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.produtos[0]).to.have.property("nome");  
            expect(res.body.produtos[0]).to.have.property("preco");
            expect(res.body.produtos[0]).to.have.property("descricao");
            expect(res.body.produtos[0]).to.have.property("quantidade");
            expect(res.body.produtos[0]).to.have.property("_id");
        });
    });
    it("Deve buscar pelo ID do produto cadastrado", () => {
        cy.buscarProduto({ _id: produto.id }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.produtos[0].nome).to.have.include(produto.nome);
        });
    });
    it("Deve buscar pelo nome do produto cadastrado", () => {
        cy.buscarProduto({ nome: produto.nome }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.produtos[0].nome).to.have.include(produto.nome);
        });
    });
    it("Deve buscar pelo preço do produto cadastrado", () => {
        cy.buscarProduto({ preco: produto.preco }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.produtos[0].preco).to.have.eql(produto.preco);
        });
    })
    it("Deve buscar pela descrição do produto cadastrado", () => {
        cy.buscarProduto({ descricao: produto.descricao }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.produtos[0].descricao).to.have.include(produto.descricao);
        });
    })
    it("Deve buscar pela quantidade do produto cadastrado", () => {
        cy.buscarProduto({ quantidade: produto.quantidade }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.produtos[0].quantidade).to.have.eql(produto.quantidade);
        });
    })
    it("Tentar buscar produto com ID inválido", () => {
        cy.buscarProduto({ _id: "454545s4ds5454s65d465s4" }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.quantidade).to.have.eql(0);
            expect(res.body).to.have.property("produtos").that.is.an("array").and.to.have.length(0);
        });
    })
    it("Tentar buscar produto passando números no campo _id", () => {
        cy.buscarProduto({ _id: 45454545465456465456 }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.quantidade).to.have.eql(0);
            expect(res.body).to.have.property("produtos").that.is.an("array").and.to.have.length(0);
        });
    })
    it("Tentar buscar produto com nome não cadastrado", () => {
        const novoNome = faker.commerce.productName();
        cy.buscarProduto({ nome: novoNome }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.quantidade).to.have.eql(0);
            expect(res.body).to.have.property("produtos").that.is.an("array").and.to.have.length(0);
        });
    })
    it("Tentar buscar produto com preço não cadastrado", () => {
        const novoPreco = 25369
        cy.buscarProduto({ preco: novoPreco }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.quantidade).to.have.eql(0);
            expect(res.body).to.have.property("produtos").that.is.an("array").and.to.have.length(0);
        });
    })
    it("Tentar buscar produto com descrição não cadastrado", () => {
        const novaDesc = faker.commerce.productDescription()
        cy.buscarProduto({ descricao: novaDesc }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.quantidade).to.have.eql(0);
            expect(res.body).to.have.property("produtos").that.is.an("array").and.to.have.length(0);
        });
    })
    it("Tentar buscar produto com quantidade não cadastrado", () => {
        const novaQtd = faker.commerce.price({ min: 100, max: 200, dec: 0 })
        cy.buscarProduto({ quantidade: novaQtd }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.quantidade).to.have.eql(0);
            expect(res.body).to.have.property("produtos").that.is.an("array").and.to.have.length(0);
        });
    })
    it("Tentar buscar produto com preço informando números décimais", () => {
        const novaQtd = faker.commerce.price({ min: 100 })
        cy.buscarProduto({ preco: novaQtd }).then((res) => {
            expect(res.status).to.eq(400);
        });
    })
    it("Tentar buscar produto com quantidade informando números décimais", () => {
        const novaQtd = faker.commerce.price({ min: 100 })
        cy.buscarProduto({ quantidade: novaQtd }).then((res) => {
            expect(res.status).to.eq(400);
        });
    })
})