describe('Index Testing', () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it('should navigate to movies and see movies from database', () => {
        cy.get('[data-cy="Movies-NavButton"]').click();

        cy.get('[data-cy="Dummy placeholder movies to be filled in-MovieList"]').within(() => {
            cy.get('[data-cy="MovieTile"]').should('be.visible');
            cy.get('[data-cy="MovieTile"]').first();
        })
    })

    it('should navigate to movie details and show info from database', () => {
        cy.get('[data-cy="Movies-NavButton"]').click();

        cy.get('[data-cy="Dummy placeholder movies to be filled in-MovieList"]').within(() => {
            cy.get('[data-cy="MovieTile"]').should('be.visible');
            cy.get('[data-cy="MovieTile"]').first().click();
        })

        cy.get('[data-cy="MovieTitle"]')
    })
})