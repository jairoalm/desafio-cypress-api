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
    });
    it("Deve listar o primeiro carrinho", () => {
        cy.requestBuscaCarrinhoId(carrinho.id).then((res) => {
            const carrinho = res.body.produtos[0]
            expect(res.status).to.eq(200);  
            expect(carrinho).to.have.property("idProduto");
            expect(carrinho).to.have.property("quantidade");
            expect(carrinho).to.have.property("precoUnitario");   
            expect(res.body).to.have.property("precoTotal");
            expect(res.body).to.have.property("quantidadeTotal");
            expect(res.body).to.have.property("idUsuario");
            expect(res.body).to.have.property("_id");
        });
    });
    it("Realizar busca por carrinho com ID inválido", () => {
        cy.requestBuscaCarrinhoId("id_invalido_123456").then((res) => {            
            expect(res.status).to.eq(400);  
            expect(res.body.id).to.include('id deve ter exatamente 16 caracteres alfanuméricos');
        });
    });
    it("Realizar busca por carrinho com ID não cadastrado", () => {
        cy.requestBuscaCarrinhoId("DQDT4ZOKwdLtcyJ9").then((res) => {            
            expect(res.status).to.eq(400);  
            expect(res.body.message).to.include('Carrinho não encontrado');
        });
    });
})