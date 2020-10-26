describe('Login Form Test', function() {
  it('successfully loads', function() {
    cy.visit('/')
    cy.get('[placeholder="CPF"]').type('04777399117');
    cy.get('[placeholder="Senha"]').type('123');
    cy.get('button')
      .contains('span', 'Acessar').click();
  });
});
