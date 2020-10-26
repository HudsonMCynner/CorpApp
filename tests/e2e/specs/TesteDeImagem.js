
describe('Get Image from server', function() {
  it('successfully loads', function() {
    cy.request({
      url: 'http://localhost:8097/perfis/avatar/download?id=1&fileName=capture.jpeg',
      encoding: 'base64',
    })
      .then((response) => {
        const base64Content = response.body
        const mime = 'image/png' // or 'image/png'
        const imageDataUrl = `data:${mime};base64,${base64Content}`
        debugger
        cy.writeFile('path/to/save/document.jpg', imageDataUrl, 'base64')
      })
  });
});
