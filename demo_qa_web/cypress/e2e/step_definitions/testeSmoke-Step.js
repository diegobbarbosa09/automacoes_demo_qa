import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("que acesso o site Demo QA", () => {
  cy.clearCookies();  
  cy.visit("/");
});

Given("escolho a opção {string} na página inicial", (menu) => {
    cy.get(".card-body").contains(menu).click();
});

Given("clico no submenu {string}", (submenu) => {
    cy.get(".menu-list .btn").contains(submenu).click();
    cy.get('h1').should('have.text', submenu);
});

When("preencho todo o formulário com valores aleatóriospreencho e submeto o formulário com dados válidos e um arquivo .txt", () => {
  cy.practiceForms();
});

When("crio um novo registro com dados válidos", () => {
    cy.get('#addNewRecordButton').click();
    cy.registrionForms();
    cy.wait(1000);
    cy.contains('.text-center', 'Web Tables').should('be.visible');
});

When("edito o registro criado", () => {
  cy.get('div.rt-tr-group .rt-td ').should('be.visible')
  // .within(() => {
  //   cy.get('xpath=//span[@title="Edit"]').click();
  // });
  // const userSalary = cy.get("#salary-wrapper #salary").should("exist");
  // userSalary.should("be.visible").click({force: true});
  // userSalary.invoke('val', '6500').trigger('input')
  // cy.get("#submit").should("be.visible").click();
})

When('clico no botão browser {string}', (botao) => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });

  if (botao === "New Window") {
    cy.get('#windowButton').click();
  }
});

When("clico no botão {string}", (paramsStart) => {
  const startButton = cy.get('#startStopButton').contains(paramsStart);
  startButton.should('be.visible').and('not.be.disabled');
  startButton.click({ force: true });   
});

When("paro a progress bar antes dos 25%", () => {
    cy.wait(1000);
    const stopButton =  cy.get('#startStopButton').contains('Stop');
    stopButton.should('be.visible').and('not.be.disabled');
    stopButton.click({ force: true });
});


Then("devo ver que um popup foi aberto após o submit", () => {
  cy.get('#example-modal-sizes-title-lg').invoke('text').should('eq', 'Thanks for submitting the form');
});

Then("fecho o popup", () => {
  cy.get('#closeLargeModal').click();
});

Then('devo ver que uma nova janela foi aberta', () => {
    cy.get('@windowOpen').should('have.been.calledOnce');
    cy.get('@windowOpen').then((stub) => {
    const url = stub.getCall(0).args[0]; 
    const absoluteUrl = new URL(url, 'https://demoqa.com').href;
    expect(absoluteUrl).to.equal('https://demoqa.com/sample');
  });
});

Then('fecho a nova janela', () => {
  cy.visit('https://demoqa.com/sample');
  cy.contains('This is a sample page').should('be.visible');
  cy.go('back');
  cy.url().should('eq', 'https://demoqa.com/browser-windows');
});

Then("devo validar que o valor da progress bar é menor ou igual a 25%", () => {
    cy.get("#progressBar")
    .invoke("text")
    .then((valor) => {
      const percentual = parseInt(valor.replace("%", "").trim());
      expect(percentual).to.be.lte(25);
    });
});

Then("aperto o botão {string} novamente", (paramsStart) => {
  const startButton = cy.get('#startStopButton').contains(paramsStart);
  startButton.should('be.visible').and('not.be.disabled');
  startButton.click({ force: true });     
});

Then("aguardo a progress bar chegar a 100%", () => {
    cy.get("#progressBar", { timeout: 65000 })
    .should(($el) => {
      const percentual = parseInt($el.text().replace("%", "").trim());
      expect(percentual).to.be.lte(100);
    });
});

Then("devo resetar a progress bar para o valor inicial", () => {
    cy.contains('Reset', { timeout: 60000 }).should('be.visible');
    cy.get('#progressBar .progress-bar').should('contain.text', '100%');
    cy.get('#resetButton').click();
    cy.get("#progressBar")
    .invoke("text")
    .then((valor) => {
      const percentual = parseInt(valor.replace("%", "").trim());
      expect(percentual).to.be.eq(0);
    });
    cy.contains('#startStopButton', 'Start').should('be.visible');
});