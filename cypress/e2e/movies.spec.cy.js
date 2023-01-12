describe('Index Testing', () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it('should show the homepage and movies from database', () => {
        cy.get('[data-cy="Movies-NavButton"]').click();

        cy.get('[data-cy="Genre-MovieList"]').within(() => {
            cy.get('[data-cy="MovieTile"]').should('be.visible');
        })
    })
})