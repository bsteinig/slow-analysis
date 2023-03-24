import React from 'react'
import Build from './Build'

describe('<Build />', () => {

  it('renders', () => {
    cy.viewport(1280, 720)
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Build />)
  })

  it('renders tour on first visit', () => {
    cy.viewport(1280, 720)
    cy.mount(<Build firstVisit={true} />)
  })
})