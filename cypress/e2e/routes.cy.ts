describe('Try as a guest link', () => {
    it('Navegate to intro', () => {
      cy.visit('http://localhost:3000');
      cy.findAllByTestId('navbar-try as a guest button').click()
      cy.findByRole("heading", { name: /phases/i }).should("exist");
    });
  });