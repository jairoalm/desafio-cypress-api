// cypress/e2e/api/users.cy.js
import { faker } from '@faker-js/faker';

describe("Testes da API de Usuários -> Cadastro de Usuários", () => {

  it("Deve criar um novo usuário", () => {
    cy.createUser().then((res) => {
      cy.validarCampoNoBody(res, "message")
      cy.validarCampoNoBody(res, "_id")
      cy.validarResposta(res, 201, "message", "Cadastro realizado com sucesso")
    });
  });
  it("Não deve permitir criar usuário com nome vazio", () => {
    cy.createUser({ nome: "" }).then((res) => {
      cy.validarCampoNoBody(res, "nome")
      cy.validarResposta(res, 400, "nome", "nome não pode ficar em branco")
    });
  });
  it("Não deve permitir criar usuário com email vazio", () => {
    cy.createUser({ email: "" }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email não pode ficar em branco")
    });
  });
  it("Não deve permitir criar usuário com password vazio", () => {
    cy.createUser({ password: "" }).then((res) => {
      cy.validarCampoNoBody(res, "password")
      cy.validarResposta(res, 400, "password", "password não pode ficar em branco")
    });
  });
  it("Não deve permitir criar usuário com administrador vazio", () => {
    cy.createUser({ administrador: "" }).then((res) => {
      cy.validarCampoNoBody(res, "administrador")
      cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
    });
  });
  it("Não deve permitir cadastrar um usuário com email já existente", () => {
    const emailRepetido = faker.internet.email();

    // Primeiro cria o usuário com o e-mail
    cy.createUser({ email: emailRepetido }).then((resp) => {
      expect(resp.status).to.eql(201);
      // Tenta criar novamente com o mesmo e-mail
      cy.createUser({ email: emailRepetido }).then((res) => {
        cy.validarResposta(res, 400, "message", "Este email já está sendo usado")
      });
    });
  })
  it("Não deve permitir criar usuário com email o formato fora do padrão", () => {
    cy.createUser({ email: "@teste.com" }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email deve ser um email válido")
    });
  });
  it("Não deve permitir criar usuário com email sem @", () => {
    cy.createUser({ email: "tetete#teste.com" }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email deve ser um email válido")
    });
  });
  it("Não deve permitir criar usuário com email usando espaços", () => {
    cy.createUser({ email: "tetete @teste.com" }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email deve ser um email válido")
    });
  });
  it("Não deve permitir criar usuário com email sem dominio", () => {
    cy.createUser({ email: "teste@" }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email deve ser um email válido")
    });
  });
  it("Não deve permitir criar usuário com nome usando números", () => {
    cy.createUser({ nome: 12345 }).then((res) => {
      cy.validarCampoNoBody(res, "nome")
      cy.validarResposta(res, 400, "nome", "nome deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com nome usando boolean = true", () => {
    cy.createUser({ nome: true }).then((res) => {
      cy.validarCampoNoBody(res, "nome")
      cy.validarResposta(res, 400, "nome", "nome deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com nome usando boolean = false", () => {
    cy.createUser({ nome: false }).then((res) => {
      cy.validarCampoNoBody(res, "nome")
      cy.validarResposta(res, 400, "nome", "nome deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com email usando números", () => {
    cy.createUser({ email: 12345 }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com email usando boolean = true", () => {
    cy.createUser({ email: true }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com email usando boolean = false", () => {
    cy.createUser({ email: false }).then((res) => {
      cy.validarCampoNoBody(res, "email")
      cy.validarResposta(res, 400, "email", "email deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com password usando números", () => {
    cy.createUser({ password: 12345 }).then((res) => {
      cy.validarCampoNoBody(res, "password")
      cy.validarResposta(res, 400, "password", "password deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com password usando boolean = true", () => {
    cy.createUser({ password: true }).then((res) => {
      cy.validarCampoNoBody(res, "password")
      cy.validarResposta(res, 400, "password", "password deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com password usando boolean = false", () => {
    cy.createUser({ password: false }).then((res) => {
      cy.validarCampoNoBody(res, "password")
      cy.validarResposta(res, 400, "password", "password deve ser uma string")
    });
  });
  it("Não deve permitir criar usuário com administrador usando números", () => {
    cy.createUser({ administrador: 12345 }).then((res) => {
      cy.validarCampoNoBody(res, "administrador")
      cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
    });
  });
  it("Não deve permitir criar usuário com administrador usando boolean = true", () => {
    cy.createUser({ administrador: true }).then((res) => {
      cy.validarCampoNoBody(res, "administrador")
      cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
    });
  });
  it("Não deve permitir criar usuário com administrador usando boolean = false", () => {
    cy.createUser({ administrador: false }).then((res) => {
      cy.validarCampoNoBody(res, "administrador")
      cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
    });
  });
})