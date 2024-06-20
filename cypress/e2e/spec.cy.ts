describe('template spec', () => {
  beforeEach(() => {
    cy.task("reseed");

  })
})


describe('/', () => {
  let quizDate: any;

  beforeEach(() => {
    cy.task('reseed');
    cy.visit('/');
  });

  it('adds a new quiz and verifies it', () => {
    // Klicka på knappen för att lägga till quiz!
    cy.contains('Lägg till nytt quiz').click({ force: true });

    // Fyll i formuläret
    cy.url().should('include', '/post-form');
    cy.get('#pubName').type('The Pub');
    cy.get('#title').type('Världens bästa quiz');
    cy.get('#content').type('Ett fantastiskt allmänquiz');
    cy.get('#day').select('Måndag');
    cy.get('#time').type('2023-06-24T18:30');

    // Skicka in formuläret
    cy.get('form').submit();
    cy.contains('Ditt quiz har blivit tillagt').should('be.visible');

    // Gå tillbaka till Posts-sidan och kolla så det finns där
    cy.visit('/');
    cy.contains('Världens bästa quiz').should('be.visible');

    cy.contains('Måndag').click();
    cy.contains('Världens bästa quiz').should('be.visible');
    cy.get('[data-cy=post-time]').invoke('text').then((text) => {
      quizDate = new Date(text);
    });
  });

  it('verifies quiz disappears after passing date', () => {
    // Manipulera klockan 
    cy.clock(quizDate.getTime() + 24 * 60 * 60 * 1000);

    cy.visit('/');
    cy.contains('Världens bästa quiz').should('not.exist');
  });
});

/* // TESTA POST SIDAN

describe('Navigering och interaktion på Post-sidan', () => {
  it('Besöker startsidan och navigerar till en post', () => {
    cy.visit('/'); // Besök startsidan
    cy.get('[data-cy=post-link]').first().click(); // Klicka på den första posten
    cy.url().should('include', '/post/');
  });

  // MALIN GLÖM INTE ATT LÄGGA TILL DATA_CY!

  it('Validerar innehåll på post-sidan', () => {
    cy.get('[data-cy=post-title]').should('exist');
    cy.get('[data-cy=post-content]').should('exist');
    cy.get('[data-cy=post-pubName]').should('exist');
    cy.get('[data-cy=post-dayOfWeek]').should('exist');
    cy.get('[data-cy=post-time]').should('exist');

    // kolla så det finns en länk
    cy.get('[data-cy=post-external-link]')
      .should('have.attr', 'href')
      .and('include', 'http');
  });
});


it('Klickar på knappen "Lägg till i kalender" och verifierar kalenderhändelse', () => {
  cy.get('[data-cy=add-to-calendar-btn]').click(); //ska gå att lägga till i kalender helst
});

it('Navigerar tillbaka till post-sidan efter kalendertillägg', () => {
  cy.go('back');
  cy.url().should('include', '/post/');
});

it('Klickar på geo-tag för att visa kartan', () => {
  cy.get('[data-cy=geo-tag]').click(); // Klicka på geo-tag (kart-position)

});
 */