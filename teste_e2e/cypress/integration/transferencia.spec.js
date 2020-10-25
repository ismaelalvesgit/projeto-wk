/// <reference types="cypress" />

before(() => {
  cy.visit('http://localhost:8080/#/transferencia')
})

beforeEach(() => {
  cy.reload()
})

describe('Fluxo de tratamento de erro', () => {

  it('Cadastro de contato', () => {
      cy.addContatoDB({nome:"Raquel Barra"}).then(() => {
      cy.get('.md-empty-state-container > button').click()
      cy.get('.md-dialog input[type="number"]').clear()
      cy.get('.md-error').should('contain.text', "Valor e Requirido")
      cy.get('.md-dialog button[type="submit"]').should('be.disabled')
    })
  })

})

describe('Fluxo normal de verificação', () => {
  
  it('Cadastro de tranferencias', () => {
    cy.addContatoDB({nome:"Raquel Barra"}).then(() => {
      cy.get('.md-empty-state-container > button').click()
      cy.get('.md-dialog input[type="number"]').clear().type(500)
      cy.get('.md-menu').click()
      cy.get('.md-list-item-content:nth-child(1)').click()
      cy.get('.md-dialog button[type="submit"]').click()
      cy.get(':nth-child(2) > :nth-child(2) > .md-table-cell-container').should('contain.text', "Raquel Barra")
      cy.get(':nth-child(2) > :nth-child(3) > .md-table-cell-container').should('contain.text', "500")
      cy.get(':nth-child(2) > :nth-child(4) > .md-table-cell-container').should('contain.text', "Finalizado")
    })
  })

  it('Cadastro duplo de tranferencias', () => {
    cy.addTransferencia({nome:"Raquel Barra"}, 500).then(() => {
      cy.get('.md-empty-state-container > button').click()
      cy.get('.md-dialog input[type="number"]').clear().type(500)
      cy.get('.md-menu').click()
      cy.get('.md-list-item-content:nth-child(1)').click({multiple:true})
      cy.get('.md-dialog button[type="submit"]').click()
      cy.get(':nth-child(2) > :nth-child(2) > .md-table-cell-container').should('contain.text', "Raquel Barra")
      cy.get(':nth-child(2) > :nth-child(3) > .md-table-cell-container').should('contain.text', "500")
      cy.get(':nth-child(2) > :nth-child(4) > .md-table-cell-container').should('contain.text', "Finalizado")
      cy.get(':nth-child(3) > :nth-child(2) > .md-table-cell-container').should('contain.text', "Raquel Barra")
      cy.get(':nth-child(3) > :nth-child(3) > .md-table-cell-container').should('contain.text', "500")
      cy.get(':nth-child(3) > :nth-child(4) > .md-table-cell-container').should('contain.text', "Cancelado")
    })
  })

})