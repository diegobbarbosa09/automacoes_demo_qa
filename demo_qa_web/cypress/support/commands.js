// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("practiceForms", (email, password) => {
  cy.get("#userName-wrapper #firstName").should("be.visible").type("Antonio");
  cy.get("#userName-wrapper #lastName").should("be.visible").type("Silva");
  cy.get("#userEmail-wrapper #userEmail").should("be.visible").type(`antonio.silva${Math.floor(Math.random() * 1000)}@email.com`);
  cy.get("#genterWrapper #gender-radio-1").click({ force: true });
  cy.get("#userNumber-wrapper #userNumber").should("be.visible").type("1199999999");
  cy.get("#dateOfBirthInput").should("be.visible").type("31/07/1965{enter}");
  cy.get("#hobbiesWrapper #hobbies-checkbox-1").click({ force: true });
  cy.get("#hobbiesWrapper #hobbies-checkbox-3").click({ force: true });
  cy.get('.form-file #uploadPicture').attachFile('Teste_QA.txt');
  cy.get('#uploadPicture').then(input => {
        expect(input[0].files[0].name).to.equal('Teste_QA.txt');
  });
  cy.get('#currentAddress-wrapper #currentAddress').type('Rua dos achados, 0');
  cy.get('#stateCity-wrapper #state').click();
  cy.get('#react-select-3-option-2').contains('Haryana').click();
  cy.get('#stateCity-wrapper #city').click();
  cy.get('#react-select-4-option-1').contains('Panipat').click();
  cy.get('#submit').click();
});

Cypress.Commands.add("registrionForms", () => {
    cy.get("#firstName").should("be.visible").type('Antonio');
    cy.get("#lastName").should("be.visible").type('Silva');
    cy.get("#userEmail").should("be.visible").type(`antonio.silva${Math.floor(Math.random() * 1000)}@email.com`);
    cy.get("#age-wrapper #age").should("be.visible").type('58');
    cy.get("#salary-wrapper #salary").should("be.visible").type('6500');
    cy.get("#department-wrapper #department").should("be.visible").type('Vendas');
    cy.contains("#submit", 'Submit').should("be.visible").click();
});

Cypress.Commands.add("addUsers", (usuario) => {
  cy.get("#firstName").should("be.visible").type(usuario.nome);
  cy.get("#lastName").should("be.visible").type(usuario.sobrenome);
  cy.get("#userEmail").should("be.visible").type(usuario.email);
  cy.get("#age-wrapper #age").should("be.visible").type(usuario.idade);
  cy.get("#salary-wrapper #salary").should("be.visible").type(usuario.salario);
  cy.get("#department-wrapper #department").should("be.visible").type(usuario.departamento);
  cy.get("#submit").should("be.visible").click();
});

Cypress.Commands.add("ordemDescres", () => {
  cy.get('#demo-tabpane-list .list-group-item').eq(5).trigger('mousedown', { which: 1 });
  cy.get('#demo-tabpane-list .list-group-item').eq(0).trigger('mousemove').trigger('mouseup', { force: true })

  cy.get('#demo-tabpane-list .list-group-item').eq(5).trigger('mousedown', { which: 1 });
  cy.get('#demo-tabpane-list .list-group-item').eq(1).trigger('mousemove').trigger('mouseup', { force: true })

  cy.get('#demo-tabpane-list .list-group-item').eq(5).trigger('mousedown', { which: 1 });
  cy.get('#demo-tabpane-list .list-group-item').eq(2).trigger('mousemove').trigger('mouseup', { force: true })

  cy.get('#demo-tabpane-list .list-group-item').eq(5).trigger('mousedown', { which: 1 });
  cy.get('#demo-tabpane-list .list-group-item').eq(3).trigger('mousemove').trigger('mouseup', { force: true })

  cy.get('#demo-tabpane-list .list-group-item').eq(5).trigger('mousedown', { which: 1 });
  cy.get('#demo-tabpane-list .list-group-item').eq(4).trigger('mousemove').trigger('mouseup', { force: true })
})
