describe('template spec', () => {
  beforeEach(() => {
    cy.task("reseed");

  })
})

describe('Post Form', () => {
  beforeEach(() => {
    cy.visit('/post-form'); 
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
  beforeEach(() => {
    cy.visit('/quiz');
  });

  it('Should navigate to the Quiz selection page', () => {
    cy.url().should('include', '/quiz');
    cy.contains('Quiz 1: Allmänbildning 📚');
    cy.contains('Quiz 2: Film och TV 🎬');
  });

  it('Should navigate to Quiz 1, answer all questions, and show the result', () => {
    cy.contains('Quiz 1: Allmänbildning 📚').click();
    cy.url().should('include', '/quiz/quiz1');

    // Fråga 1
    cy.contains('Vilket år började andra världskriget?').parent().find('button').contains('1939').click();
// Fråga 2
    cy.contains('Vem skrev \'Till havs\'?').parent().find('button').contains('Evert Taube').click();
// Fråga 3
    cy.contains('Vilken är världens längsta flod?').parent().find('button').contains('Nilen').click();
// Fråga 4
    cy.contains('Vilket land uppfann osthyveln?').parent().find('button').contains('Norge').click();
// Fråga 5
    cy.contains('Matematiska namnet på att lägga ihop något?').parent().find('button').contains('Addera').click();
// Fråga 6
    cy.contains('Med vilken låt vann ABBA euorovision 1974?').parent().find('button').contains('Waterloo').click();
// Fråga 7
    cy.contains('Vilken är Sveriges näst största stad?').parent().find('button').contains('Göteborg').click();
// Fråga 8
    cy.contains('Vad heter den största galaxen som hittills skådats?').parent().find('button').contains('Alcyoneus').click();
// Fråga 9
    cy.contains('Vilket land har flest invånare per kvm?').parent().find('button').contains('Monaco').click();

    cy.contains('Du fick 9 av 9 rätt!').should('be.visible');
    
    // Spara resultat
    cy.get('input[placeholder="Skriv ditt namn"]').type('Test User');
    cy.contains('Spara resultat').click();

    // navigera tillbaka till poängbrädet
    cy.url().should('include', '/quiz');

    // Spara skiten i LS
    cy.window().then((win) => {
      const scoreboard = JSON.parse(win.localStorage.getItem('scoreboard') || '[]');
      expect(scoreboard).to.have.length.greaterThan(0);
      expect(scoreboard[0]).to.have.property('username', 'Test User');
    });
  });

  it('Should sort scores in scoreboard', () => {
    cy.contains('Quiz 1: Allmänbildning 📚').click();
    cy.url().should('include', '/quiz/quiz1');

    // Gör tester för första användaren "Förlorare"
    // Fråga1
    cy.contains('Vilket år började andra världskriget?').parent().find('button').contains('1939').click();
//fråga 2
    cy.contains('Vem skrev \'Till havs\'?').parent().find('button').contains('Evert Taube').click();
// Fråga 3
    cy.contains('Vilken är världens längsta flod?').parent().find('button').contains('Nilen').click();
// Fråga 4
    cy.contains('Vilket land uppfann osthyveln?').parent().find('button').contains('Norge').click();
// Fråga 5
    cy.contains('Matematiska namnet på att lägga ihop något?').parent().find('button').contains('Addera').click();
// Fråga 6
    cy.contains('Med vilken låt vann ABBA euorovision 1974?').parent().find('button').contains('Waterloo').click();

    // Fråga 7 väljer ett felaktigt svar
    cy.contains('Vilken är Sveriges näst största stad?').parent().find('button').contains('Stockholm').click();
// Fråga 8
    cy.contains('Vad heter den största galaxen som hittills skådats?').parent().find('button').contains('Alcyoneus').click();
// Fråga 9
    cy.contains('Vilket land har flest invånare per kvm?').parent().find('button').contains('Monaco').click();

    cy.get('input[placeholder="Skriv ditt namn"]').type('Förlorare');
    cy.contains('Spara resultat').click();

    // Nästa användare Vinnaren
    cy.contains('Quiz 1: Allmänbildning 📚').click();
    cy.url().should('include', '/quiz/quiz1');
    cy.contains('Vilket år började andra världskriget?').parent().find('button').contains('1939').click();
    cy.contains('Vem skrev \'Till havs\'?').parent().find('button').contains('Evert Taube').click();
    cy.contains('Vilken är världens längsta flod?').parent().find('button').contains('Nilen').click();
    cy.contains('Vilket land uppfann osthyveln?').parent().find('button').contains('Norge').click();
    cy.contains('Matematiska namnet på att lägga ihop något?').parent().find('button').contains('Addera').click();
    cy.contains('Med vilken låt vann ABBA euorovision 1974?').parent().find('button').contains('Waterloo').click();
    cy.contains('Vilken är Sveriges näst största stad?').parent().find('button').contains('Göteborg').click();
    cy.contains('Vad heter den största galaxen som hittills skådats?').parent().find('button').contains('Alcyoneus').click();
    cy.contains('Vilket land har flest invånare per kvm?').parent().find('button').contains('Monaco').click();

    cy.get('input[placeholder="Skriv ditt namn"]').type('Vinnaren');
    cy.contains('Spara resultat').click();

    // navigerar tillbaka till sidan där man ser poängen
    cy.url().should('include', '/quiz');

    // kolla så att den sorterar efter poäng
    cy.window().then((win) => {
      const scoreboard = JSON.parse(win.localStorage.getItem('scoreboard') || '[]');
      expect(scoreboard[0].username).to.equal('Vinnaren');
      expect(scoreboard[1].username).to.equal('Förlorare');
    });
  });
});

