describe('template spec', () => {
  beforeEach(() => {
    cy.task("reseed");

  })
})

describe('Post Form', () => {
  beforeEach(() => {
    cy.visit('/post-form'); // Besök sidan med formuläret
  });

  it('should display form elements correctly', () => {
    cy.get('input[name="title"]').should('exist');
    cy.get('input[name="pubName"]').should('exist');
    cy.get('textarea[name="content"]').should('exist');
    cy.get('select[name="dayOfWeek"]').should('exist');
    cy.get('input[name="time"]').should('exist');
    cy.get('input[name="website"]').should('exist'); 
    cy.get('button[type="submit"]').contains('Lägg till');
  });

  it('should submit the form successfully', () => {
    cy.intercept('POST', '/api/posts').as('postRequest');

    cy.get('input[name="title"]').type('Test Title');
    cy.get('input[name="pubName"]').type('Test Pub');
    cy.get('textarea[name="content"]').type('Test content');
    cy.get('select[name="dayOfWeek"]').select('Måndag');
    cy.get('input[name="time"]').type('12:00');
    cy.get('input[name="website"]').type('https://example.com'); 
    cy.get('button[type="submit"]').click();

    cy.wait('@postRequest', { timeout:10000 }).its('response.statusCode').should('eq', 200);
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show validation errors', () => {
    cy.get('button[type="submit"]').click();

    cy.get('span').contains('Du måste fylla i en titel');
      cy.get('span').contains('Du måste fylla i ett pubnamn');
      cy.get('span').contains('Du måste fylla i en beskrivning');
  });
});


describe('Post Form and Day Navigation', () => {
  beforeEach(() => {
    cy.task("reseed"); // Återställ databasen innan varje test
  });

  it('should create posts for different days and display them correctly', () => {
    // Skapa inlägg för varje dag i veckan
    const daysOfWeek = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
    
    daysOfWeek.forEach(day => {
      cy.visit('/post-form'); // Besök formuläret

      // Fyll i formuläret
      cy.get('input[name="title"]').type(`Test Title for ${day}`);
      cy.get('input[name="pubName"]').type('Test Pub');
      cy.get('textarea[name="content"]').type('Test content');
      cy.get('select[name="dayOfWeek"]').select(day);
      cy.get('input[name="time"]').type('12:00');
      cy.get('input[name="website"]').type('https://example.com');

      // Skicka formuläret
      cy.get('button[type="submit"]').click();
    });

    // Kontrollera att varje dag visar rätt inlägg
    daysOfWeek.forEach(day => {
      cy.visit('/?veckodag=' + encodeURIComponent(day)); // Besök sidan för den specifika dagen

      // Verifiera att inlägget för den dagen är närvarande
      cy.contains(`Test Title for ${day}`).should('exist');
      cy.contains('Test Pub').should('exist');
      cy.contains('Test content').should('exist');
      
    });
  });
});




/* 

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
}); */

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