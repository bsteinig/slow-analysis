import React from 'react'
import Overview from './Overview'

describe('<Overview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Overview />)
  })

  it('renders a heading', () => {
    cy.mount(<Overview />)
    cy.get('h1').should('exist')
    cy.get('h1').should('contain', 'Overview')
  })

  it('renders tour button when not first visit', () => {
    cy.mount(<Overview firstVisit={false} />, )
    cy.get('button').should('exist')
    cy.get('button').should('contain', 'Resume Tour')
  })

  it('does not render tour button when first visit', () => {
    cy.mount(<Overview firstVisit={true} />)
    cy.get('button').should('not.exist')
  })
})