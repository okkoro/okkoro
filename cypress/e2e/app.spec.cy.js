describe('Index Testing', () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it('should show the homepage and movies from database', () => {
        cy.get('h1').contains('WELCOME TO OKKORO');

        cy.get('h2').contains("Genre");

        cy.get('[data-cy="Genre-MovieList"]').within(() => {
            cy.get('[data-cy="MovieTile"]').should('be.visible');
        })
    })
})