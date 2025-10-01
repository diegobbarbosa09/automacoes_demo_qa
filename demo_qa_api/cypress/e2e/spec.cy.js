import * as schema from '../fixtures/schemas/contratos_schema'


describe('Fluxo completo da  ', () => {
  const baseUrl = 'https://demoqa.com';
  const username = `usuario_${Date.now()}`;
  const password = 'SenhaForte@123';
  let userID;
  let token;

  it('Deve executar o fluxo completo de criação, autenticação e aluguel de livros', () => {
    // 1. Criar usuário
    cy.api({
      method: 'POST',
      url: `${baseUrl}/Account/v1/User`,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false,
      body: { 
        userName: username,
        password: password 
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('userID');
      userID = res.body.userID;
    });

    // 2. Gerar token
    cy.api({
      method: 'POST',
      url: `${baseUrl}/Account/v1/GenerateToken`,
      failOnStatusCode: false,
      body: { 
        userName: username,
        password: password
      }}).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
      expect(res.body.status).to.eq('Success');
      token = res.body.token;
    });

    // 3. Confirmar se o usuário está autorizado
    cy.api({
      method: 'POST',
      url: `${baseUrl}/Account/v1/Authorized`,
      failOnStatusCode: false,
      body: { 
        userName: username,
        password: password 
      }}).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.eq(true);
    });

    // 4. Listar livros disponíveis
    cy.api({
      method: 'GET',
      url: `${baseUrl}/BookStore/v1/Books`,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.books).to.be.an('array').and.have.length.greaterThan(1);
      const livros = res.body.books.slice(0, 2);

      // 5. Alugar (adicionar) os dois livros
      cy.api({
        method: 'POST',
        url: `${baseUrl}/BookStore/v1/Books`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          userId: userID,
          collectionOfIsbns: livros.map(l => ({ isbn: l.isbn }))
        }
      }).then((res) => {
        expect(res.status).to.eq(201);
      });

      // 6. Validar detalhes do usuário
      cy.api({
        method: 'GET',
        url: `${baseUrl}/Account/v1/User/${userID}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.username).to.eq(username);
        expect(res.body.books).to.have.length(2);
        expect(res.body.books.map(b => b.isbn)).to.include.members(livros.map(l => l.isbn));
      });
    });
  });
});
