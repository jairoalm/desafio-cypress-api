// cypress/e2e/api/users.cy.js
import { faker } from '@faker-js/faker';

describe("Testes da API de Usuários", () => {
  let user;

  it("Deve criar um novo usuário", () => {
    cy.createUser().then((res) => {
      user = res;
      const userId = user.body._id;
      console.log(userId)
      expect(user.status).to.eql(201);
      expect(user.body).to.have.property("message");
      expect(user.body).to.have.property("_id");
      expect(user.body.message).to.include('Cadastro realizado com sucesso');      
    });
  });
  it("Não deve permitir criar usuário com nome vazio", () => {
    cy.createUser({ nome: "" }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("nome");
      expect(user.body.nome).to.include("nome não pode ficar em branco"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com email vazio", () => {
    cy.createUser({ email: "" }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email não pode ficar em branco"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com password vazio", () => {
    cy.createUser({ password: "" }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("password");
      expect(user.body.password).to.include("password não pode ficar em branco"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com administrador vazio", () => {
    cy.createUser({ administrador: "" }).then((res) => {
      console.log(res)
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("administrador");
      expect(user.body.administrador).to.include("administrador deve ser 'true' ou 'false'"); // ou a mensagem correta da API
    });
  });

  it("Não deve permitir cadastrar um usuário com email já existente", () => {
    const emailRepetido = faker.internet.email();

    // Primeiro cria o usuário com o e-mail
    cy.createUser({ email: emailRepetido }).then((res1) => {
      expect(res1.status).to.eql(201);

      // Tenta criar novamente com o mesmo e-mail
      cy.createUser({ email: emailRepetido }).then((res2) => {
        expect(res2.status).to.eql(400); // ou 409, dependendo da API
        expect(res2.body.message).to.include("Este email já está sendo usado"); // ou a mensagem correta da sua API
      });
    });
  })
  it("Não deve permitir criar usuário com email o formato fora do padrão", () => {
    cy.createUser({ email: "@teste.com" }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
    });
  });
   it("Não deve permitir criar usuário com email sem @", () => {
    cy.createUser({ email: "tetete#teste.com" }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com email usando espaços", () => {
    cy.createUser({ email: "tetete @teste.com" }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com email sem dominio", () => {
    cy.createUser({ email: "teste@" }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com nome usando números", () => {
    cy.createUser({ nome: 12345 }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("nome");
      expect(user.body.nome).to.include("nome deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com nome usando boolean = true", () => {
    cy.createUser({ nome: true }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("nome");
      expect(user.body.nome).to.include("nome deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com nome usando boolean = false", () => {
    cy.createUser({ nome: false }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("nome");
      expect(user.body.nome).to.include("nome deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com email usando números", () => {
    cy.createUser({ email: 12345 }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com email usando boolean = true", () => {
    cy.createUser({ email: true }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser uma string"); // ou a mensagem correta da API
    });
  });
   it("Não deve permitir criar usuário com email usando boolean = false", () => {
    cy.createUser({ email: false }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com password usando números", () => {
    cy.createUser({ password: 12345 }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("password");
      expect(user.body.password).to.include("password deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com password usando boolean = true", () => {
    cy.createUser({ password: true }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("password");
      expect(user.body.password).to.include("password deve ser uma string"); // ou a mensagem correta da API
    });
  });
   it("Não deve permitir criar usuário com password usando boolean = false", () => {
    cy.createUser({ password: false }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("password");
      expect(user.body.password).to.include("password deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com administrador usando números", () => {
    cy.createUser({ administrador: 12345 }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("administrador");
      expect(user.body.administrador).to.include("administrador deve ser 'true' ou 'false'"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir criar usuário com administrador usando boolean = true", () => {
    cy.createUser({ administrador: true }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("administrador");
      expect(user.body.administrador).to.include("administrador deve ser 'true' ou 'false'"); // ou a mensagem correta da API
    });
  });
   it("Não deve permitir criar usuário com administrador usando boolean = false", () => {
    cy.createUser({ administrador: false }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("administrador");
      expect(user.body.administrador).to.include("administrador deve ser 'true' ou 'false'"); // ou a mensagem correta da API
    });
  });
})