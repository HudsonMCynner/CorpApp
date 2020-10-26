cy.request({
  url: 'https://docs.cypress.io/img/logo.png',
  encoding: 'base64',
})
  .then((response) => {
    const base64Content = response.body
    const mime = response.headers['content-type'] // or 'image/png'
    const imageDataUrl = `data:${mime};base64,${base64Content}`
  })
