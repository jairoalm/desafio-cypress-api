// cypress/e2e/api/users.cy.js
import { faker } from '@faker-js/faker';

describe("Testes da API de Usuários -> Editar Usuário", () => {
    let user = {};
    before(() => {
        cy.createUser().then((res) => {
            user.id = res.body._id;
            user.nome = res.requestBody.nome;
            user.email = res.requestBody.email;
            user.password = res.requestBody.password
            cy.log(user.id)
            cy.log(user.nome)
            cy.log(user.email)
        });
    });
    it("Deve atualizar apenas o nome do usuário", () => {
        const novoNome = "Nome Alterado Apenas";

        cy.updateUserId(user.id, { nome: novoNome }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Registro alterado com sucesso");
        });

        // E opcionalmente verificar se o nome foi mesmo alterado
        cy.buscarUser({ nome: novoNome }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.usuarios[0].nome).to.eq(novoNome);
            expect(res.body.usuarios[0].nome).to.not.eq(user.nome)
        });
    });

    it("Deve atualizar o email do usuário", () => {
        const novoEmail = "emailalterado@gmail.com";

        cy.updateUserId(user.id, { email: novoEmail }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Registro alterado com sucesso");
        });

        // E validando se atualizou corretamente
        cy.buscarUser({ email: novoEmail }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.usuarios[0].email).to.eq(novoEmail);
            expect(res.body.usuarios[0].email).to.not.eq(user.email)
        });
    });
    it("Deve atualizar o email do usuário", () => {
        const novosDados = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: user.password,
            administrador: "true",
        };

        cy.updateUserId(user.id, novosDados).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.include("Registro alterado com sucesso");
        });

        // E validando se atualizou corretamente
        cy.buscarUser({ email: novosDados.email }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.usuarios[0].email).to.eq(novosDados.email);
            expect(res.body.usuarios[0].email).to.not.eq(user.email)
        });
    });
    it("Não deve permitir alterar usuário com nome vazio", () => {
        cy.updateUserId(user.id, { nome: "" }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.nome).to.include("nome não pode ficar em branco");
        });
    });
    it("Não deve permitir alterar usuário com email vazio", () => {
        cy.updateUserId(user.id, { email: "" }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.email).to.include("email não pode ficar em branco");
        });
    });
    it("Não deve permitir alterar usuário com password vazio", () => {
        cy.updateUserId(user.id, { password: "" }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.password).to.include("password não pode ficar em branco");
        });
    });
    it("Não deve permitir alterar usuário com password vazio", () => {
        cy.updateUserId(user.id, { administrador: "" }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.administrador).to.include("administrador deve ser 'true' ou 'false'");
        });
    });
    it("Não deve permitir alterar usuário com email o formato fora do padrão", () => {
        cy.updateUserId(user.id, { email: "@teste.com" }).then((res) => {
            expect(res.status).to.eql(400); // ou o status retornado pela sua API
            expect(res.body).to.have.property("email");
            expect(res.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
        });
    });
    it("Não deve permitir alterar usuário com email sem @", () => {
        cy.updateUserId(user.id, { email: "tetete#teste.com" }).then((res) => {
            expect(res.status).to.eql(400); // ou o status retornado pela sua API
            expect(res.body).to.have.property("email");
            expect(res.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
        });
    });
    it("Não deve permitir alterar usuário com email usando espaços", () => {
        cy.updateUserId(user.id, { email: "tetete @teste.com" }).then((res) => {
            expect(res.status).to.eql(400); // ou o status retornado pela sua API
            expect(res.body).to.have.property("email");
            expect(res.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
        });
    });
    it("Não deve permitir alterar usuário com email sem dominio", () => {
        cy.updateUserId(user.id, { email: "teste@" }).then((res) => {
            expect(res.status).to.eql(400); // ou o status retornado pela sua API
            expect(res.body).to.have.property("email");
            expect(res.body.email).to.include("email deve ser um email válido"); // ou a mensagem correta da API
        });
    });



    it("Não deve permitir alterar usuário com nome usando números", () => {
    cy.updateUserId(user.id,  { nome: 12345 }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("nome");
      expect(user.body.nome).to.include("nome deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com nome usando boolean = true", () => {
    cy.updateUserId(user.id, { nome: true }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("nome");
      expect(user.body.nome).to.include("nome deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com nome usando boolean = false", () => {
    cy.updateUserId(user.id, { nome: false }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("nome");
      expect(user.body.nome).to.include("nome deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com email usando números", () => {
    cy.updateUserId(user.id, { email: 12345 }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com email usando boolean = true", () => {
    cy.updateUserId(user.id, { email: true }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser uma string"); // ou a mensagem correta da API
    });
  });
   it("Não deve permitir alterar usuário com email usando boolean = false", () => {
    cy.updateUserId(user.id, { email: false }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("email");
      expect(user.body.email).to.include("email deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com password usando números", () => {
    cy.updateUserId(user.id, { password: 12345 }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("password");
      expect(user.body.password).to.include("password deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com password usando boolean = true", () => {
    cy.updateUserId(user.id, { password: true }).then((res) => {
      user = res;
      expect(user.status).to.eql(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("password");
      expect(user.body.password).to.include("password deve ser uma string"); // ou a mensagem correta da API
    });
  });
   it("Não deve permitir alterar usuário com password usando boolean = false", () => {
    cy.updateUserId(user.id, { password: false }).then((res) => {
      user = res;
      cy.validacaoStatusCode(400) // ou o status retornado pela sua API
      expect(user.body).to.have.property("password");
      expect(user.body.password).to.include("password deve ser uma string"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com administrador usando números", () => {
    cy.updateUserId(user.id, { administrador: 12345 }).then((res) => {
      user = res;
      cy.validacaoStatusCode(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("administrador");
      expect(user.body.administrador).to.include("administrador deve ser 'true' ou 'false'"); // ou a mensagem correta da API
    });
  });
  it("Não deve permitir alterar usuário com administrador usando boolean = true", () => {
    cy.updateUserId(user.id, { administrador: true }).then((res) => {
      user = res;
      cy.validacaoStatusCode(400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("administrador");
      expect(user.body.administrador).to.include("administrador deve ser 'true' ou 'false'"); // ou a mensagem correta da API
    });
  });
   it.only("Não deve permitir alterar usuário com administrador usando boolean = false", () => {
    cy.updateUserId(user.id, { administrador: false }).then((res) => {
      user = res;
      cy.validacaoStatusCode(res, 400); // ou o status retornado pela sua API
      expect(user.body).to.have.property("administrador");
      expect(user.body.administrador).to.include("administrador deve ser 'true' ou 'false'"); // ou a mensagem correta da API
    });
  });
})