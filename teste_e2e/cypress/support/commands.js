// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('addTransferencia', (contato, transferencia)=>{ 
    cy.addContatoDB(contato).then(() => {
        cy.get('.md-empty-state-container > button').click()
        cy.get('.md-dialog input[type="number"]').clear().type(transferencia)
        cy.get('.md-menu').click()
        cy.get('.md-list-item-content:nth-child(1)').click()
        cy.get('.md-dialog button[type="submit"]').click()
        cy.get(':nth-child(2) > :nth-child(2) > .md-table-cell-container').should('contain.text', contato.nome)
        cy.get(':nth-child(2) > :nth-child(3) > .md-table-cell-container').should('contain.text', transferencia)
        cy.get(':nth-child(2) > :nth-child(4) > .md-table-cell-container').should('contain.text', "Finalizado")
    })
})

Cypress.Commands.add('addContato', (nome)=>{ 
    cy.get('.md-empty-state-container > button').click()
    cy.get('.md-dialog input[type="text"]').type(nome)
    cy.get('.md-dialog button[type="submit"]').click()
    cy.get(':nth-child(2) > :nth-child(2) > .md-table-cell-container').should('contain.text', nome)
})

Cypress.Commands.add('addContatoDB', (value)=>{ 
    cy.task('query.save', {
        modelName: 'contato',
        values: value
    })
})