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
  const fisrtName = cy.get("#userName-wrapper #firstName").should("exist");
  fisrtName.should("be.visible").click();
  fisrtName.type("Antonio");
  const lastName = cy.get("#userName-wrapper #lastName").should("exist");
  lastName.should("be.visible").click();
  lastName.type("Silva");
  const userEmail = cy.get("#userEmail-wrapper #userEmail").should("exist");
  userEmail.should("be.visible").click();
  userEmail.type(`antonio.silva${Math.floor(Math.random() * 1000)}@email.com`);
  cy.get("#genterWrapper #gender-radio-1").click({ force: true });
  const userNumber = cy.get("#userNumber-wrapper #userNumber").should("exist");
  userNumber.should("be.visible").click();
  userNumber.type("1199999999");
  const dateOfBirthInput = cy.get("#dateOfBirthInput").should("exist");
  dateOfBirthInput.should("be.visible").click();
  dateOfBirthInput.type("31/07/1965{enter}");
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
    const fisrtName = cy.get("#firstName").should("exist");
    fisrtName.should("be.visible").click();
    fisrtName.invoke('val', 'Antonio').trigger('input')
    const lastName = cy.get("#lastName").should("exist");
    lastName.should("be.visible").click();
    lastName.invoke('val', 'Silva').trigger('input')
    const userEmail = cy.get("#userEmail").should("exist");
    userEmail.should("be.visible").click();
    userEmail.invoke('val', `antonio.silva${Math.floor(Math.random() * 1000)}@email.com`).trigger('input')
    const userAge = cy.get("#age-wrapper #age").should("exist");
    userAge.should("be.visible").click();
    userAge.invoke('val', '58').trigger('input')
    const userSalary = cy.get("#salary-wrapper #salary").should("exist");
    userSalary.should("be.visible").click();
    userSalary.invoke('val', '6500').trigger('input')
    const userDepartment = cy.get("#department-wrapper #department").should("exist");
    userDepartment.should("be.visible").click();
    userDepartment.invoke('val', 'Vendas').trigger('input')
    const submitButton = cy.contains("#submit", 'Submit').should("be.visible").and("not.be.disabled");
    submitButton.click();
});
