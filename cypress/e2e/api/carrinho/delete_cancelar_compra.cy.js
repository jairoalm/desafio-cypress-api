describe("Testes da API de Carrinho - Concluir Compra", () => {
    let user = {};
    let produtoId;
    before(() => {
        cy.createUser().then((res) => {
            user.id = res.body._id;
            const { email, password } = res.requestBody;
            cy.loginApi(email, password);      
            cy.log("id_user", user.id)      
        });
        cy.createProduct().then((res) => {
            user = res;
            produtoId = user.body._id;
            cy.requestAdicionarCarrinho(produtoId).then((res) => {
                user = res;
                const carrinhotId = user.body._id;
                cy.log("id_carrinho", carrinhotId)
            });
        })
    })
    it("Deve cancelar a compra e carrinho ser excluído", () => {
        cy.requestCancelarCompraNoCarrinho().then((res) => {
              expect(res.status).to.eql(200);
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.include('Registro excluído com sucesso');     
        });
    });
    it("Tentar concluir a compra com usuário que não tem produtos no carrinho", () => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody;
            cy.loginApi(email, password);
            cy.requestConcluirCompraNoCarrinho().then((res) => {
                expect(res.status).to.eql(200);
                expect(res.body).to.have.property("message");
                expect(res.body.message).to.include('Não foi encontrado carrinho para esse usuário');
            });
        });
    })
    it("Deve falhar ao cancelar carrinho com token inválido", () => {
        cy.requestInvalidToken(
            "DELETE",
            "/carrinhos/cancelar-compra",
            "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
        )
    });
})