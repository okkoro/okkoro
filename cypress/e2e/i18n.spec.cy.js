describe('I18N Testing', () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it('should open the home page and switch language', () => {
    cy.get('h1').contains('WELCOME TO OKKORO');

    cy.get('[data-cy="Language-NavButton"]').click();

    cy.get('h1').contains('BIENVENUE À OKKORO');
  })
})