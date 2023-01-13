import React from 'react'
import ProfileMovieList from '../../components/ProfileMovieList'

const MOVIES = [
    10800,
    10845,
    10877
]
const NAME = "liked"
describe('<ProfileMovieList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // @ts-ignore
    cy.mount(<ProfileMovieList  listTitle={NAME} movies={MOVIES}/>)

    cy.get('[data-cy="MovieTile"]').each(() => {
      cy.get('[data-cy="MovieTitle"]').should('be.visible');
      cy.get('[data-cy="MovieReleaseDate"]').should('be.visible');
    })
  })
})