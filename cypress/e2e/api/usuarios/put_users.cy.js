import { faker } from '@faker-js/faker';

describe("Testes da API de Usuários -> Editar Usuários", () => {
  beforeEach(() => {
    cy.cadastrarNovoUsuario()
  });
  it("Deve atualizar apenas o nome do usuário", () => {
    const novoNome = "Nome Alterado Apenas";
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { nome: novoNome }).then((res) => {
        cy.validarCampoNoBody(res, "message");
        cy.validarResposta(res, 200, "message", "Registro alterado com sucesso");
        cy.buscarUser({ nome: novoNome }).then((resBusca) => {
          cy.validarStatus(res, 200);
          expect(resBusca.body.usuarios[0].nome).to.eq(novoNome);
          expect(resBusca.body.usuarios[0].nome).to.not.eq(user.nome);
        });
      });
    });
  });

  it("Deve atualizar o email do usuário", () => {
    const novoEmail = faker.internet.email();
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: novoEmail }).then((res) => {
        cy.validarCampoNoBody(res, "message");
        cy.validarResposta(res, 200, "message", "Registro alterado com sucesso");
        cy.buscarUser({ email: novoEmail }).then((resBusca) => {
          cy.validarStatus(res, 200);
          expect(resBusca.body.usuarios[0].email).to.eq(novoEmail);
          expect(resBusca.body.usuarios[0].email).to.not.eq(user.email);
        });
      });
    });
  });
  it("Deve atualizar dados do usuário", () => {
    cy.get("@user").then((user) => {
      const novosDados = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: user.password,
        administrador: "true",
      };
      cy.updateUserId(user.id, novosDados).then((res) => {
        cy.validarCampoNoBody(res, "message");
        cy.validarResposta(res, 200, "message", "Registro alterado com sucesso");
        cy.buscarUser({ email: novosDados.email }).then((resBusca) => {
          cy.validarStatus(res, 200);
          expect(resBusca.body.usuarios[0].email).to.eq(novosDados.email);
          expect(resBusca.body.usuarios[0].email).to.not.eq(user.email);
        });
      });
    });
  });
  it("Não deve permitir alterar usuário com nome vazio", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { nome: "" }).then((res) => {
        cy.validarResposta(res, 400, "nome", "nome não pode ficar em branco")
      });
    });
  });
  it("Não deve permitir alterar usuário com email vazio", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: "" }).then((res) => {
        cy.validarResposta(res, 400, "email", "email não pode ficar em branco")
      });
    });
  });
  it("Não deve permitir alterar usuário com password vazio", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { password: "" }).then((res) => {
        cy.validarResposta(res, 400, "password", "password não pode ficar em branco")
      });
    });
  });
  it("Não deve permitir alterar usuário com administrador vazio", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { administrador: "" }).then((res) => {
        cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
      });
    });
  });
  it("Não deve permitir alterar usuário com email o formato fora do padrão", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: "@teste.com" }).then((res) => {
        cy.validarCampoNoBody(res, "email")
        cy.validarResposta(res, 400, "email", "email deve ser um email válido")
      });
    });
  });
  it("Não deve permitir alterar usuário com email sem @", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: "tetete#teste.com" }).then((res) => {
        cy.validarCampoNoBody(res, "email")
        cy.validarResposta(res, 400, "email", "email deve ser um email válido")
      });
    });
  });
  it("Não deve permitir alterar usuário com email usando espaços", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: "tetete @teste.com" }).then((res) => {
        cy.validarCampoNoBody(res, "email")
        cy.validarResposta(res, 400, "email", "email deve ser um email válido")
      });
    });
  });
  it("Não deve permitir alterar usuário com email sem dominio", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: "teste@" }).then((res) => {
        cy.validarCampoNoBody(res, "email")
        cy.validarResposta(res, 400, "email", "email deve ser um email válido")
      });
    });
  });
  it("Não deve permitir alterar usuário com nome usando números", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { nome: 12345 }).then((res) => {
        cy.validarCampoNoBody(res, "nome")
        cy.validarResposta(res, 400, "nome", "nome deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com nome usando boolean = true", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { nome: true }).then((res) => {
        cy.validarCampoNoBody(res, "nome")
        cy.validarResposta(res, 400, "nome", "nome deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com nome usando boolean = false", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { nome: false }).then((res) => {
        cy.validarCampoNoBody(res, "nome")
        cy.validarResposta(res, 400, "nome", "nome deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com email usando números", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: 12345 }).then((res) => {
        cy.validarCampoNoBody(res, "email")
        cy.validarResposta(res, 400, "email", "email deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com email usando boolean = true", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: true }).then((res) => {
        cy.validarCampoNoBody(res, "email")
        cy.validarResposta(res, 400, "email", "email deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com email usando boolean = false", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { email: false }).then((res) => {
        cy.validarCampoNoBody(res, "email")
        cy.validarResposta(res, 400, "email", "email deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com password usando números", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { password: 12345 }).then((res) => {
        cy.validarCampoNoBody(res, "password")
        cy.validarResposta(res, 400, "password", "password deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com password usando boolean = true", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { password: true }).then((res) => {
        cy.validarCampoNoBody(res, "password")
        cy.validarResposta(res, 400, "password", "password deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com password usando boolean = false", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { password: false }).then((res) => {
        cy.validarCampoNoBody(res, "password")
        cy.validarResposta(res, 400, "password", "password deve ser uma string")
      });
    });
  });
  it("Não deve permitir alterar usuário com administrador usando números", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { administrador: 12345 }).then((res) => {
        cy.validarCampoNoBody(res, "administrador")
        cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
      });
    });
  });
  it("Não deve permitir alterar usuário com administrador usando boolean = true", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { administrador: true }).then((res) => {
        cy.validarCampoNoBody(res, "administrador")
        cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
      });
    });
  });
  it("Não deve permitir alterar usuário com administrador usando boolean = false", () => {
    cy.get("@user").then((user) => {
      cy.updateUserId(user.id, { administrador: false }).then((res) => {
        cy.validarCampoNoBody(res, "administrador")
        cy.validarResposta(res, 400, "administrador", "administrador deve ser 'true' ou 'false'")
      });
    });
  });
})