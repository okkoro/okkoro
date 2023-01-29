// describe("Lists Testing", () => {
//     beforeEach(() => {
//         cy.visit("/movies/13")
//     })
//
//     it('should add the movie to a list', () => {
//         cy.get('[data-cy="addToListButton"]').click();
//
//         cy.get('[data-cy="list-selector"]').select(0);
//         cy.get('[data-cy="submit-button"]').click();
//     });
//
//     it('should add the already listed movie to another list', () => {
//         cy.get('[data-cy="addToListButton"]').click();
//
//         cy.get('[data-cy="list-selector"]').select("favorites").should("have.value", "favorites");
//         cy.get('[data-cy="submit-button"]').click();
//     });
// })