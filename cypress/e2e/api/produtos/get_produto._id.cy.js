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
    it("Deve buscar por ID do produto e validar propriedade do responde body", () => {
        cy.buscarProdutoId(produto.id).then((res) => {
            expect(res.status).to.eq(200);
            // expect(res.body.produtos[0]).to.have.property('produtos');
            // expect(res.body).to.have.property("email");
            // expect(res.body).to.have.property("password");
            // expect(res.body).to.have.property("administrador");
            // expect(res.body).to.have.property("_id");
        });
    });
})