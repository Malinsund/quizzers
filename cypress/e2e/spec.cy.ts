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

describe('Post Visibility on Homepage', () => {
  beforeEach(() => {
    cy.task("reseed"); 
  });

  it('should create posts on different days and display them on the homepage', () => {
    cy.visit('/post-form'); 
    cy.get('input[name="title"]').type('Inlägg för Måndag');
    cy.get('input[name="pubName"]').type('Test Pub 1');
    cy.get('textarea[name="content"]').type('Innehåll för Måndag');
    cy.get('select[name="dayOfWeek"]').select('Måndag');
    cy.get('input[name="time"]').type('09:00');
    cy.get('input[name="website"]').type('https://example.com');
    cy.get('button[type="submit"]').click();

 
    cy.visit('/post-form'); 
    cy.get('input[name="title"]').type('Inlägg för Tisdag');
    cy.get('input[name="pubName"]').type('Test Pub 2');
    cy.get('textarea[name="content"]').type('Innehåll för Tisdag');
    cy.get('select[name="dayOfWeek"]').select('Tisdag');
    cy.get('input[name="time"]').type('10:00');
    cy.get('input[name="website"]').type('https://anotherexample.com');
    cy.get('button[type="submit"]').click();

   
    cy.visit('/'); 

    cy.contains('Inlägg för Måndag').should('exist');
    cy.contains('Innehåll för Måndag').should('exist');
    cy.contains('Inlägg för Tisdag').should('exist');
    cy.contains('Innehåll för Tisdag').should('exist');
  });
});


describe('Post Form and Day Navigation', () => {
  beforeEach(() => {
    cy.task("reseed"); 
  });

  it('should create posts for different days and display them correctly', () => {
  // Array för alla dagar som den skall gå igenom.
    const daysOfWeek = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
    
    daysOfWeek.forEach(day => {
      cy.visit('/post-form'); 

      cy.get('input[name="title"]').type(`Test Title for ${day}`);
      cy.get('input[name="pubName"]').type('Test Pub');
      cy.get('textarea[name="content"]').type('Test content');
      cy.get('select[name="dayOfWeek"]').select(day);
      cy.get('input[name="time"]').type('12:00');
      cy.get('input[name="website"]').type('https://example.com');

      cy.get('button[type="submit"]').click();
    });

    // Gå igenom alla dagar från arrayen 
    daysOfWeek.forEach(day => {
      cy.visit('/?veckodag=' + encodeURIComponent(day)); 

      cy.contains(`Test Title for ${day}`).should('exist');
      cy.contains('Test Pub').should('exist');
      cy.contains('Test content').should('exist');
      
    });
  });
});

// testa PostPage och att inte andra posts visas
describe('Post Details Page', () => {
  beforeEach(() => {
    cy.task("reseed"); 
    cy.visit('/post-form'); 
    
    cy.get('input[name="title"]').type('Kalle Anka');
    cy.get('input[name="pubName"]').type('Test Pub');
    cy.get('textarea[name="content"]').type('Disney favoriten');
    cy.get('select[name="dayOfWeek"]').select('Måndag');
    cy.get('input[name="time"]').type('12:00');
    cy.get('input[name="website"]').type('https://example.com');
    cy.get('button[type="submit"]').click();
  });

  it('should display the correct post on the post details page', () => {
  
    cy.contains('Kalle Anka').click(); 
    cy.url().should('include', '/posts/');
    
    cy.contains('Kalle Anka').should('exist');
    cy.contains('Test Pub').should('exist');
    cy.contains('Disney favoriten').should('exist');
    cy.contains('Datum: Måndag').should('exist');
    cy.contains('https://example.com').should('exist');
  });

  it('should not display other posts on the post details page', () => {
    // skapa inlägg
    cy.visit('/post-form');
    cy.get('input[name="title"]').type('The Simpsons');
    cy.get('input[name="pubName"]').type('Another Pub');
    cy.get('textarea[name="content"]').type('Springfield');
    cy.get('select[name="dayOfWeek"]').select('Tisdag');
    cy.get('input[name="time"]').type('13:00');
    cy.get('input[name="website"]').type('https://anotherexample.com');
    cy.get('button[type="submit"]').click();

    // Gå till inlägget
    cy.contains('Kalle Anka').click();

    // kolla så att bara den första posten visas och inte den andra
    cy.contains('Kalle Anka').should('exist');
    cy.contains('Test Pub').should('exist');
    cy.contains('Disney favoriten').should('exist');

    // kolla att den andra posten inte visas
    cy.contains('The Simpsons').should('not.exist');
    cy.contains('Another Pub').should('not.exist');
    cy.contains('Springfield').should('not.exist');
  });
});

describe('Quiz Functionality', () => {
  it('Should navigate to the Quiz selection page', () => {
    cy.visit('/quiz');

    cy.url().should('include', '/quiz');
    cy.contains('Quiz 1: Allmänbildning 📚');
    cy.contains('Quiz 2: Film och TV 🎬');
  });

  it('Should navigate to Quiz 1, answer all questions, and show the result', () => {
    cy.visit('/quiz');

    cy.contains('Quiz 1: Allmänbildning 📚').click();

    cy.url().should('include', '/quiz/quiz1');

    // Fråga 1
    cy.contains('Vilket år började andra världskriget?');
    cy.contains('1939').click();

    // Fråga 2
    cy.contains('Vem skrev \'Till havs\'?');
    cy.contains('Evert Taube').click();

    // Fråga 3
    cy.contains('Vilken är världens längsta flod?');
    cy.contains('Nilen').click();

// Fråga 4
    cy.contains('Vilket land uppfann osthyveln?');
    cy.contains('Norge').click();

// Fråga 5
    cy.contains('Matematiska namnet på att lägga ihop något?');
    cy.contains('Addera').click();

// Fråga 6
    cy.contains('Med vilken låt vann ABBA euorovision 1974?');
    cy.contains('Waterloo').click();

// Fråga 7
    cy.contains('Vilken är Sveriges näst största stad?');
    cy.contains('Göteborg').click();

// Fråga 8

    cy.contains('Vad heter den största galaxen som hittills skådats?');
    cy.contains('Alcyoneus').click();
// Fråga 9

    cy.contains('Vilket land har flest invånare per kvm?');
    cy.contains('Monaco').click();

    // Kontrollera att resultatet visas korrekt
    cy.contains('Du fick 9 av 9 rätt!');
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



/* 
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