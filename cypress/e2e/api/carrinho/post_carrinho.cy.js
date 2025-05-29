import { faker } from '@faker-js/faker';

describe("Testes da API de Produtos", () => {
    let user;
    let produtoId;
    before(() => {
        cy.createUser().then((res) => {
            const { email, password } = res.requestBody;
            cy.loginApi(email, password);            
        });
        cy.createProduct().then((res) => {
                user = res;
                produtoId = user.body._id;
        });
    })

    it("Deve criar um novo produto", () => {
        cy.adicionarCarrinho(produtoId).then((res) => {
            user = res;
              const carrinhotId = user.body._id;
              cy.log(carrinhotId)
              expect(user.status).to.eql(201);
              expect(user.body).to.have.property("message");
              expect(user.body).to.have.property("_id");
              expect(user.body.message).to.include('Cadastro realizado com sucesso');     
        });
    });
})