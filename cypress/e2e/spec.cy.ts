describe('template spec', () => {
  beforeEach(() => {
    cy.task("reseed");

  })
})

// 1. En användare besöker sidan och får veckodagarna presenterade, väljer onsdag och start den första quizen för onsdagen. Fösta frågan visas för användaren och....
// 2. En användare besöker sidan och klickar på "lägg till quiz"-knappen och kommer då till skapa sidan där ett formulär visas. Användaren fyller sedan i....

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get("h1").contains("Hitta ditt Quiz idag!").should("be.visible");
  });
  it('successfully loads', () => {
    cy.visit('/');
    cy.get("h1").contains("Hitta ditt Quiz idag!").should("be.visible");

  });
  it('contains a header', () => {
    cy.get('header').contains("Quizzers").should("be.visible");
  });

  it('contains a main section', () => {
    cy.get('main').should('exist');
  });
});

describe('PostPage', () => {
  beforeEach(() => {
    cy.task('reseed');
    cy.visit('/posts');
  });

  it('adds a new quiz and verifies it', () => {
    // Klicka på knappen för att lägga till quiz!
    cy.contains('Lägg till quiz').click();

    // Fyll i formuläret
    // cy.url("/add-new")
    cy.get('#pubName').type('The Pub');
    cy.get('#title').type('Världens bästa quiz');
    cy.get('#content').type('Ett fantastiskt allmänquiz');
    cy.get('#day').select('Måndag');
    cy.get('#time').type('2023-06-24T18:30');

    // Skicka in formuläret
    cy.get('form').submit();
    cy.contains('Ditt quiz har bivit tillagt').should('be.visible');

    // Gå tillbaka till Posts-sidan och kolla så det finns där
    cy.visit('/');
    cy.contains('Världens bästa quiz').should('be.visible');


    cy.contains('Måndag').click();
    cy.contains('Världens bästa quiz').should('be.visible');
  });
});