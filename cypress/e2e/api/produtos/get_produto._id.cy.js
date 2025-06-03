describe("Testes da API de Produtos -> Buscar Produtos Por Campos ", () => {
    beforeEach(() => {
        cy.cadastrarNovoProduto()
    });
    it("Deve buscar por ID do produto e validar propriedade do responde body", () => {
        cy.get("@produto").then((produto) => {
            cy.buscarProdutoId(produto.id).then((res) => {
                cy.validarStatus(res, 200);
                cy.validarCampoNoBody(res, "nome");
                cy.validarCampoNoBody(res, "preco");
                cy.validarCampoNoBody(res, "descricao");
                cy.validarCampoNoBody(res, "quantidade");
            });
        })
    });
    it("Deve buscar produto por ID e validar nome", () => {
        cy.get("@produto").then((produto) => {
            cy.buscarProdutoId(produto.id).then((res) => {
                cy.validarResposta(res, 200, "nome", produto.nome);
            });
        });
    });
    it("Deve buscar produto por ID e validar ID", () => {
        cy.get("@produto").then((produto) => {
            cy.buscarProdutoId(produto.id).then((res) => {
                cy.validarCampoNoBody(res, "_id");
            });
        });
    });
    it("Validar busca por produto com ID vazio", () => {
        cy.buscarProdutoId().then((res) => {
            cy.validarStatus(res, 400);
        });
    });
    it("Validar busca por produto com ID incorreto", () => {
        cy.buscarProdutoId("1234567890jmkloi").then((res) => {
            cy.validarCampoNoBody(res, "message")
            cy.validarResposta(res, 400, "message", "Produto não encontrado")
        });
    });
    it("Validar busca por produto e ID com menos de 16 caracteres alfanuméricos", () => {
        cy.buscarProdutoId("1234567890jmklo").then((res) => {
            cy.validarCampoNoBody(res, "id")
            cy.validarResposta(res, 400, "id", "id deve ter exatamente 16 caracteres alfanuméricos")
        });
    });
})