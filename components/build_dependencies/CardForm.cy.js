import { Grid } from '@mantine/core';
import React from 'react';
import CardForm from './CardForm';
import TestWrapper from './TestWrapper';

describe('<CardForm />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        const selection = {
            active: true,
        };

        cy.mount(
            <TestWrapper
                component={
                    <CardForm selection={selection} setFormSubmission={() => {}} isEditing={-1} slides={[]} />
                }
            />,
        );
    });
    it('disables form submission when there is no selection', () => {
        const selection = {
            active: false,
        };

        cy.mount(
            <TestWrapper
                component={
                    <CardForm selection={selection} setFormSubmission={() => {}} isEditing={-1} slides={[]} />
                }
            />,
        );
        cy.get('#mantine-r0').should('be.disabled');
        cy.get('#mantine-r1').should('be.disabled');
        cy.get('button').should('be.disabled');
    });
});
