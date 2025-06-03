Cypress.Commands.add("loginApi", (email, password) => {
    cy.request({
        method: "POST",
        url: "/login",
        body: {
            email,
            password
        },
        failOnStatusCode: false
    }).then((res) => {
        if (res.status === 200) {
            const tokenCompleto = res.body.authorization;
            expect(tokenCompleto).to.include("Bearer");
            Cypress.env("token", tokenCompleto);
        }
        return res;
    });
});

Cypress.Commands.add("login", () => {
    cy.createUser().then((res) => {
        const { email, password } = res.requestBody;
        cy.loginApi(email, password);
    });
});

Cypress.Commands.add("loginUserCommon", () => {
    return cy.createUser({ administrador: "false" }).then((res) => {
        const { email, password } = res.requestBody;
        return cy.loginApi(email, password);
    });
});