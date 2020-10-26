cy.request('http://localhost:8097/pessoas')
  .then((response) => {
    cy.writeFile('path/to/save/document.txt', response.body, 'binary')
  })
