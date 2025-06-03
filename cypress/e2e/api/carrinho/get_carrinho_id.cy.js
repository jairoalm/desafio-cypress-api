describe("Testes da API de Carrinhos - Realizar busca por carrinhos por ID", () => {
    let produto = {};
    let user = {};
    let carrinho = {};
    beforeEach(() => {
        cy.createUser().then((resUser) => {
            user.id = resUser.body._id;
            cy.log(user.id)
            const { email, password } = resUser.requestBody;
            cy.loginApi(email, password);
        });
        cy.createProduct().then((res) => {
            produto.id = res.body._id;                                
            cy.requestAdicionarCarrinho(produto.id).then((res) => {
                carrinho.id = res.body._id;
                cy.log("id_carrinho", carrinho.id)
            });
        });
        cy.criarUsuarioProdutoECarrinho()
    });
    it("Deve listar o primeiro carrinho", () => {
        cy.requestBuscaCarrinhoId(carrinho.id).then((res) => {
            const carrinho = res.body.produtos[0]
            cy.validarStatus(res, 200);
            expect(carrinho).to.have.property("idProduto");
            expect(carrinho).to.have.property("quantidade");
            expect(carrinho).to.have.property("precoUnitario");
            cy.validarCampoNoBody(res, "precoTotal");
            cy.validarCampoNoBody(res, "quantidadeTotal");
            cy.validarCampoNoBody(res, "idUsuario");
            cy.validarCampoNoBody(res, "_id");
        });
    });
    it("Realizar busca por carrinho com ID inválido", () => {
        cy.requestBuscaCarrinhoId("id_invalido_123456").then((res) => {            
            cy.validarResposta(res, 400, "id", "id deve ter exatamente 16 caracteres alfanuméricos");
        });
    });
    it("Realizar busca por carrinho com ID não cadastrado", () => {
        cy.requestBuscaCarrinhoId("DQDT4ZOKwdLtcyJ9").then((res) => {            
            cy.validarResposta(res, 400, "message", "Carrinho não encontrado");
        });
    });
})