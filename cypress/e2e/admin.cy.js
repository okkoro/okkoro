describe('Admin Testing', () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it('should not have admin indicator in navbar', () => {
        cy.get('[data-cy="Admin-NavIndicator"]').should('not.exist');
    })

    it('should not find the review admin delete button', () => {
        //Navigate to movie page
        cy.get('[data-cy="Movies-NavButton"]').click();
        cy.get('[data-cy="Dummy placeholder movies to be filled in-MovieList"]').within(() => {
            cy.get('[data-cy="MovieTile"]').should('be.visible');
            cy.get('[data-cy="MovieTile"]').first().click();
        })
        cy.get('[data-cy="MovieTitle"]')

        //Get to dropdown menu
        cy.get('[data-cy="Reviews-Dropdown"]').should('not.exist');
    })

})