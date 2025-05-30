describe("Testar limite de taxas da API cadastrar usuário", () => {

  it("Valida limite real com requisições em alta velocidade", () => {
    const total = 300;
    const results = [];

    for (let i = 0; i < total; i++) {
      cy.createUser().then((res) => {
        results.push(res.status);
        cy.log(`Req ${i + 1}: ${res.status}`);
      });
    }

    cy.wrap(null).then(() => {
      const summary = results.reduce((acc, status) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      cy.log("Resumo final:", JSON.stringify(summary));
    });
  });
})