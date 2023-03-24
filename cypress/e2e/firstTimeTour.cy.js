describe('firstTimeVisit', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000') // check if page renders
  })

  it('opens tour', () => {
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(2) > .mantine-3xbgk5 > .mantine-qo1k2').click()
    cy.get('.sc-EHOje').should('exist') // make sure tour shows up since it's first visit
  })

  it('closes tour', () => {
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(2) > .mantine-3xbgk5 > .mantine-qo1k2').click()
    cy.get('.sc-EHOje').should('exist')
    cy.get('.sc-EHOje').type('{esc}') // Is able to close tour
    cy.get('.sc-EHOje').should('not.exist') // And the tour is gone
  })

  it('can create a new project', () => {
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(2) > .mantine-3xbgk5 > .mantine-qo1k2').click()
    cy.get('.sc-EHOje').should('exist')
    cy.get('.sc-EHOje').type('{esc}')
    cy.get('.sc-EHOje').should('not.exist')
    cy.get('.tour__project-trash').click() // Can restart the project following the tour
    cy.get('.mantine-zju5rl').should('exist')
    cy.get('.mantine-zju5rl').click() // confirming the restart in the modal

    cy.get('.mantine-erdwia').should('not.exist') // make sure tooltips dont show up on intro screen

    cy.get('#mantine-r1o').focus().type('https://ourworldindata.org/uploads/2018/11/Annual-World-Population-since-10-thousand-BCE-for-OWID-800x498.png')
    cy.get('.mantine-Stack-root > .mantine-8od8ev > .mantine-UnstyledButton-root').click()
    cy.get('#mantine-r1p').should('exist') // Make sure the form advanced to the next step
      .focus()
      .type('Sample Project')
 
    cy.get('[type="submit"]').click() // submit the form

    cy.get('.tour__titlegroup > .mantine-Title-root')
      .should('exist') // make sure the project title shows up
      .should('have.text', 'Sample Project') // and that it's the right title

    cy.get('img')
      .should('exist') // make sure the image shows up
      .should('have.attr', 'src', 'https://ourworldindata.org/uploads/2018/11/Annual-World-Population-since-10-thousand-BCE-for-OWID-800x498.png') // and that it's the right image

  })
})