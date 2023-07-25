describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000');
  });
}); 