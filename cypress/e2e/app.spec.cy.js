describe('Index Testing', () => {
    it('should show a welcome heading', () => {
        cy.visit("/");

        cy.get('h1').contains('WELCOME TO OKKORO');
    })
})