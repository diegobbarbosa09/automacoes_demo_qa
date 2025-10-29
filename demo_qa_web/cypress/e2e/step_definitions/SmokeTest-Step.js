import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from '@faker-js/faker';

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

When("preencho e submeto o formulário com dados válidos e um arquivo .txt", () => {
  cy.practiceForms();
});

When("crio um novo registro com dados válidos", () => {
  cy.get('#addNewRecordButton').click();
  cy.registrionForms();
  cy.wait(1000);
  cy.contains('.text-center', 'Web Tables').should('be.visible');
});

When("edito o registro criado", () => {
  cy.contains('div.rt-td', 'Antonio')
    .parents('div.rt-tr-group')
    .find('span[title="Edit"]')
    .click();

  cy.get("#salary-wrapper #salary").should("be.visible").type('{selectall}7500');
  cy.get("#submit").should("be.visible").click();
})

When('devo ver o registro atualizado na tabela', () => {
  cy.contains('div.rt-tr-group', 'Antonio')
    .find('div.rt-td')
    .should('contain.text', '7500');

})

When('crio 12 novos registros de forma dinâmica', () => {
  const usuariosCriados = [];

  for (let i = 0; i < 12; i++) {
    const nome = faker.person.firstName();

    const usuario = {
      nome: nome,
      sobrenome: 'Teste',
      email: `${nome.toLowerCase()}.teste@email.com`,
      idade: 25 + i,
      salario: 7000 + i,
      departamento: 'QA'
    };

    cy.get('#addNewRecordButton').click();
    cy.addUsers(usuario);
    usuariosCriados.push(usuario);
  }

  cy.wrap(usuariosCriados).as('usuariosCriados');

});


When('devo ver os 12 registros adicionados na tabela', () => {
  cy.get('select').select('20').should('be.visible');

  cy.get('div.rt-tbody')
    .find('div.rt-tr-group')
    .filter((index, el) => {
      return Cypress.$(el).text().trim().length > 0;
    })
    .should('have.length', 15);

  cy.get('@usuariosCriados').then((usuariosCriados) => {
    usuariosCriados.forEach((usuario) => {
      cy.contains('div.rt-tr-group', usuario.nome)
        .should('be.visible')
    });
  });

});

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
  const stopButton = cy.get('#startStopButton').contains('Stop');
  stopButton.should('be.visible').and('not.be.disabled');
  stopButton.click({ force: true });
});

When('realizar o drag and drop em ordem decrescente', () => {
  cy.ordemDescres()
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

Then('deleto o registro criado', () => {
  cy.contains('div.rt-td', 'Antonio')
    .parents('div.rt-tr-group')
    .find('span[title="Delete"]')
    .click();
});

Then('não devo ver mais o registro na tabela', () => {
  cy.contains('div.rt-tr-group', 'Antonio').should('not.exist')
});

Then('deleto todos os novos registros criados', function () {
  cy.get('@usuariosCriados').then((usuariosCriados) => {
    usuariosCriados.forEach((usuario) => {
      cy.contains('div.rt-tr-group', usuario.nome)
        .should('exist')
        .within(() => {
          cy.get('span[title="Delete"]').click();
        });
    });
  });
});

Then('não devo ver mais nenhum dos registros criados', () => {
  cy.get('@usuariosCriados').then((usuariosCriados) => {
    usuariosCriados.forEach((usuario) => {
      cy.contains('div.rt-tr-group', usuario.nome)
        .should('not.exist')
    })
  });
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

Then('deve vizualizar a ordenação decrescente em tela', () => {
  cy.get('#demo-tabpane-list .list-group-item')
  .then($items => {
    const ordemFinal = Cypress._.map($items, el => el.innerText.trim());
    expect(ordemFinal).to.deep.equal(['Six', 'Five', 'Four', 'Three', 'Two', 'One']);
  });

})