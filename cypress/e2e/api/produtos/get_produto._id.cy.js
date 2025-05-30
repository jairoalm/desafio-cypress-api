describe("Testes da API de Usuários -> Editar Usuário", () => {
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
            expect(res.body).to.have.property("nome");
            expect(res.body).to.have.property("preco");
            expect(res.body).to.have.property("descricao");
            expect(res.body).to.have.property("quantidade");
        });
    });
    it("Deve buscar produto por ID e validar nome", () => {
        cy.buscarProdutoId(produto.id).then((res) => {
            cy.log(produto.nome)
            expect(res.status).to.eq(200);
            expect(res.body.nome).to.include(produto.nome);
        });
    });
    it("Deve buscar produto por ID e validar ID", () => {
        cy.buscarProdutoId(produto.id).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body._id).to.include(produto.id);
        });
    });
    it("Validar busca por produto com ID vazio", () => {
        cy.buscarProdutoId().then((res) => {
            expect(res.status).to.eq(400);
        });
    });
    it("Validar busca por produto com ID incorreto", () => {
        cy.buscarProdutoId("1234567890jmkloi").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.include('Produto não encontrado');
        });
    });
    it("Validar busca por produto e ID com menos de 16 caracteres alfanuméricos", () => {
        cy.buscarProdutoId("1234567890jmklo").then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.id).to.include('id deve ter exatamente 16 caracteres alfanuméricos');
        });
    });
})