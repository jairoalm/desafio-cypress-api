describe("Testes da API de Carrinho - Concluir Compra", () => {
    beforeEach(() => {
        cy.criarUsuarioProdutoECarrinho()
    })
    it("Deve concluir a compra e carrinho ser excluído", () => {
        cy.requestConcluirCompraNoCarrinho().then((res) => {
            cy.validarResposta(res, 200, "message", "Registro excluído com sucesso");
        });
    });
    it("Tentar concluir a compra com usuário que não tem produtos no carrinho", () => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody;
            cy.loginApi(email, password);
            cy.requestConcluirCompraNoCarrinho().then((res) => {
                cy.validarResposta(res, 200, "message", "Não foi encontrado carrinho para esse usuário");
                expect(res.status).to.eql(200);
                expect(res.body).to.have.property("message");
                expect(res.body.message).to.include('Não foi encontrado carrinho para esse usuário');
            });
        });
    });
    it("Deve falhar ao concluir carrinho com token inválido", () => {
        cy.requestInvalidToken(
            "DELETE",
            "/carrinhos/concluir-compra",
            "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
        )
    });
})