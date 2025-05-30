describe("Testes da API de Produtos", () => {
    let user;
    let produtoId;
    beforeEach(() => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody;
            cy.loginApi(email, password);
        });
        cy.createProduct().then((res) => {
            produtoId = res.body._id;
            cy.log(produtoId)
        });
    })
    it("Deve adicionar produto no carrinho", () => {
        cy.requestAdicionarCarrinho(produtoId).then((res) => {
              expect(res.status).to.eql(201);
              expect(res.body).to.have.property("message");
              expect(res.body).to.have.property("_id");
              expect(res.body.message).to.include('Cadastro realizado com sucesso');     
        });
    });
    it("Não deve adicionar produto duplicado", () => {
        cy.requestAdicionarCarrinho(produtoId).then((res) => {
            user = res;
              expect(user.status).to.eql(201);
              cy.log("1ª adição:", JSON.stringify(res.body));
        });
        cy.requestAdicionarCarrinho(produtoId).then((res) => {
            user = res;
            cy.log("2ª tentativa duplicada:", JSON.stringify(res.body));
              expect(user.status).to.eql(400);
              expect(user.body).to.have.property("message");
              expect(user.body.message).to.include('Não é permitido ter mais de 1 carrinho');     
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