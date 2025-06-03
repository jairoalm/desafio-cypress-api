describe("Testes da API de Carrinhos -> Cancelar Compra", () => {
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
            cy.validarResposta(res, 200, "message", "Registro excluído com sucesso");
        });
    });
    it("Tentar concluir a compra com usuário que não tem produtos no carrinho", () => {
        cy.createUser().then((res) => {
            cy.requestConcluirCompraNoCarrinho().then((res) => {
                cy.validarResposta(res, 200, "message", "Não foi encontrado carrinho para esse usuário");
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