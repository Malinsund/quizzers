describe('template spec', () => {
  beforeEach(() => {
    cy.exec("npm run reset && npm run seed");
  })
})

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get("h1").contains("fuck you Ezikiel").should("be.visible");
  })
})
