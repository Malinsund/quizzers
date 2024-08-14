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
      cy.get('button[type="submit"]').contains('Lägg till');
    });
  
    it('should submit the form successfully', () => {
      cy.intercept('POST', '/api/posts').as('postRequest');
  
      cy.get('input[name="title"]').type('Test Title');
      cy.get('input[name="pubName"]').type('Test Pub');
      cy.get('textarea[name="content"]').type('Test content');
      cy.get('select[name="dayOfWeek"]').select('Måndag');
      cy.get('input[name="time"]').type('12:00');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  
    it('should show validation errors', () => {
      cy.get('button[type="submit"]').click();
  
      cy.get('span').contains('Du måste fylla i en titel');
      cy.get('span').contains('Du måste fylla i ett pubnamn');
      cy.get('span').contains('Du måste fylla i en beskrivning');
      cy.get('span').contains('DayOfWeek is required');
      cy.get('span').contains('Time is required');
    });
  });