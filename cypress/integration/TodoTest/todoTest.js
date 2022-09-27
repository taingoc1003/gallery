/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('http://localhost:3000')

})

it('Add todo item', () => {
    cy.get('.todo-input-text').type('Add new todo item {enter}')
})

it('Update todo item', () => {
    cy.get('.todo-input-text').type('Add new todo item {enter}')
    cy.get('.btn-edit').click()
    cy.get('.todo-onchange > input').clear().type('Update todo item')
    cy.get('.todo-onchange > button').click()
})
