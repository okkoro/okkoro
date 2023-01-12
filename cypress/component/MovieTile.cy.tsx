import React from 'react'
import MovieTile from "../../components/MovieTile";


let movie = {
  id: 13,
  poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
  original_language: 'en',
  vote_average: 8.5,
  genre_ids: [35, 18, 10749],
  title: 'Forrest Gump',
  overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.',
  release_date: '1994-06-23'
};

describe('<MovieTile />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MovieTile  movie={movie} />)

    cy.get(".card-title").contains(movie.title);
  })
})