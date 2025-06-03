describe("Testes da API de Carrinhos -> Realizar busca por Carrinhos", () => {
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
            produto.nome = res.requestBody.nome;
            produto.preco = res.requestBody.preco;
            produto.descricao = res.requestBody.descricao;
            produto.quantidade = res.requestBody.quantidade;                        
            cy.requestAdicionarCarrinho(produto.id).then((res) => {
                carrinho.id = res.body._id;
            });
        });
    });
    it("Deve listar o primeiro carrinho", () => {
        cy.requestBuscaCarrinho({ }).then((res) => {
            const carrinho = res.body.carrinhos[0]
            cy.validarStatus(res, 200);
            expect(carrinho).to.have.property("_id");
            expect(carrinho).to.have.property("precoTotal");
            expect(carrinho).to.have.property("quantidadeTotal");
            expect(carrinho).to.have.property("idUsuario");
        });
    });
    it("Deve listar carrinho por ID", () => {
        cy.requestBuscaCarrinho({ _id: carrinho.id }).then((res) => {
            const carrinho = res.body.carrinhos[0]
            cy.validarStatus(res, 200);
            expect(carrinho).to.have.property("_id");
        });
    });
    it("Deve listar carrinho por precoTotal", () => {
        cy.requestBuscaCarrinho({ precoTotal: produto.preco}).then((res) => {
            const carrinho = res.body.carrinhos[0]
            cy.validarStatus(res, 200);         
            expect(carrinho).to.have.property("precoTotal");
            
        });
    });
    it("Deve listar carrinho por quantidadeTotal", () => {        
        cy.requestBuscaCarrinho({ quantidadeTotal: produto.quantidade }).then((res) => {
            cy.log(produto.quantidade)
            const carrinho = res.body.carrinhos[0]
            cy.validarStatus(res, 200);
            expect(carrinho.quantidadeTotal).to.eql(Number(produto.quantidade));
        });
    });
    it("Deve listar carrinho por ID do Usuário", () => {
        cy.requestBuscaCarrinho({ idUsuario: user.id }).then((res) => { 
            const carrinho = res.body.carrinhos[0]
            cy.validarStatus(res, 200);
            expect(carrinho.idUsuario).to.eql(user.id);
        });
    });
})