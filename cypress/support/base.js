// validação da resposta do Status Code
Cypress.Commands.add("validarStatus", (res, statusEsperado) => {
    expect(res.status).to.eql(statusEsperado);
})
// Validação da mensagem de reposta do response body
Cypress.Commands.add("validarMensagem", (res, campo, mensagemEsperada) => {
    expect(res.body[campo]).to.include(mensagemEsperada);
})
// Commands que combina validação da mensagem e status code do response resposta 
Cypress.Commands.add("validarResposta", (res, statusEsperado, campo, mensagemEsperada) => {
    cy.validarStatus(res, statusEsperado);
    cy.validarMensagem(res, campo, mensagemEsperada);
})
// Validação se o objeto existe no response body
Cypress.Commands.add("validarCampoNoBody", (res, campo) => {
    expect(res.body).to.have.property(campo);
})
// Validação se o campo contém um valor esperado
Cypress.Commands.add("validarCampoComValor", (res, campo, valorEsperado) => {
    expect(res.body[campo]).to.eql(valorEsperado);
})