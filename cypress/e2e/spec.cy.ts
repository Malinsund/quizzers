describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})
describe("the page contains a Header", () => {
  it("")
})