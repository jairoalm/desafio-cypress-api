describe("Testes da API de Carrinho -> Adicionar Carrinhos", () => {
    beforeEach(() => {
        cy.cadastrarNovoProduto()
        cy.wrap(1000);
        
    })
    it("Deve adicionar produto no carrinho", () => {
        cy.get("@produto").then((produto) => {
            cy.requestAdicionarCarrinho(produto.id).then((res) => {
                cy.validarCampoNoBody(res, "message")
                cy.validarCampoNoBody(res, "_id")
                cy.validarResposta(res, 201, "message", "Cadastro realizado com sucesso")
            });
        })
    });
    it("Não deve adicionar produto duplicado", () => {
        cy.get("@produto").then((produto) => {
            cy.requestAdicionarCarrinho(produto.id).then((res1) => {
                expect(res1.status).to.eql(201);
                cy.log("1ª adição:", JSON.stringify(res1.body));
                cy.requestAdicionarCarrinho(produto.id).then((res2) => {
                    cy.log("2ª tentativa duplicada:", JSON.stringify(res2.body));
                    cy.validarCampoNoBody(res2, "message");
                    cy.validarResposta(res2, 400, "message", "Não é permitido ter mais de 1 carrinho");
                });
            });
        });
    });
    it("Deve falhar ao adicionar carrinho com token inválido", () => {
        cy.requestInvalidToken(
            "POST",
            "/carrinhos",
            "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
        )
    });
})