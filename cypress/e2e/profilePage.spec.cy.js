
// describe("Delete Movie From List", () => {
//     //TODO: Implement Login
//     beforeEach(() => {
//         cy.visit("/enter");
//     })
//
//     it("should remove movie from list", () => {
//         cy.get('[data-cy="googleButton"]').click()
//     });
// });
// describe("Get Recommendations", () => {
//     //TODO: Implement Login
//     beforeEach(() => {
//         cy.visit("/users/clementcadieux");
//     })
//
//     it("should click on button", () => {
//         cy.get('[data-cy="recomButton"]').click();
//
//         cy.get('[data-cy="-MovieList"]').within(() => {
//             cy.get('[data-cy="MovieTile"]').should('be.visible');
//         })
//     });
// });

describe("See Lists", () => {
    //TODO: Implement Login
    beforeEach(() => {
        cy.visit("/users/clementcadieux");
    })

    it("should see movies", () => {

        cy.get('[data-cy="liked-ProfileMovieList"]').within(() => {
            cy.get('[data-cy="MovieTile"]').should('be.visible');
        })
    });
});


