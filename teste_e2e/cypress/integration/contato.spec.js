/// <reference types="cypress" />

before(() => {
  cy.visit('http://localhost:8080/#/contato')
})

beforeEach(() => {
  cy.reload()
})

describe('Fluxo de tratamento de erro', () => {

  it('Cadastro de contato', () => {
    cy.get('.md-empty-state-container > button').click()
    cy.get('.md-dialog input[type="text"]').type("ismael alves")
    cy.get('.md-dialog input[type="text"]').clear()
    cy.get('.md-error').should('contain.text', "Nome e Requirido")
    cy.get('.md-dialog button[type="submit"]').should('be.disabled')
  })

  it('Atualizar o contato', () => {
    cy.addContato("Raquel Barra").then(() => {
      cy.get('#editar').click()
      cy.get('.md-dialog input[type="text"]').clear()
      cy.get('.md-error').should('contain.text', "Nome e Requirido")
      cy.get('.md-dialog button[type="submit"]').should('be.disabled')
    })
  })

  it('Deletar o contato', () => {
    cy.addContato("Raquel Barra").then(() => {
      cy.get('#deletar').click()
      cy.get('.swal2-cancel').click()
      cy.get(':nth-child(2) > :nth-child(2) > .md-table-cell-container').should('contain.text', "Raquel Barra")
    })
  })

})

describe('Fluxo normal de verificação', () => {
  
  it('Cadastro de contato', () => {
    cy.get('.md-empty-state-container > button').click()
    cy.get('.md-dialog input[type="text"]').type("ismael alves")
    cy.get('.md-dialog button[type="submit"]').click()
    cy.get(':nth-child(2) > :nth-child(2) > .md-table-cell-container').should('contain.text', "ismael alves")
  })

  it('Atualizar o contato', () => {
    cy.addContato("Raquel Barra").then(() => {
      cy.get('#editar').click()
      cy.get('.md-dialog input[type="text"]').clear()
      cy.get('.md-dialog input[type="text"]').type("ismael alves")
      cy.get('.md-dialog button[type="submit"]').click()
    cy.get(':nth-child(2) > :nth-child(2) > .md-table-cell-container').should('contain.text', "ismael alves")
    })
  })

  it('Deletar o contato', () => {
    cy.addContato("Raquel Barra").then(() => {
      cy.get('#deletar').click()
      cy.get('.swal2-confirm').click()
      cy.get('.swal2-confirm').click()
      cy.get('.md-empty-state-label').should('contain.text', "Cadastre seu primeiro contato...")
    })
  })

})