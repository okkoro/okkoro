import {render, screen} from '@testing-library/react'
import Home from '../../pages/index'

const movies = [
    {
        id: 13,
        poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
        original_language: 'en',
        vote_average: 8.5,
        genre_ids: [35, 18, 10749],
        title: 'Forrest Gump',
        overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. Butdespite all he has achieved, his one true love eludes him.',
        release_date: '1994-06-23'
    },
    {
        overview: 'A card shark and his unwillingly-enlisted friends need to make a lot of cash quickafter losing a sketchy poker match. To do this they decide to pull a heist on a small-time gangwho happen to be operating out of the flat next door.',
        id: 100,
        genre_ids: [35, 80],
        vote_average: 8.1,
        poster_path: '/8kSerJrhrJWKLk1LViesGcnrUPE.jpg',
        original_language: 'en',
        release_date: '1998-08-28',
        title: 'Lock, Stock and Two Smoking Barrels'
    },
    {
        overview: 'A hard-nosed cop reluctantly teams up with a wise-cracking criminal temporarily paroled to him, in order to track down a killer.',
        original_language: 'en',
        title: '48 Hrs.',
        poster_path: '/phNxblI8gWJxATAGd5G4Nts7GcL.jpg',
        vote_average: 6.7,
        genre_ids: [53, 28, 35, 80, 18],
        release_date: '1982-12-07',
        id: 150
    },
    {
        id: 153,
        vote_average: 7.4,
        release_date: '2003-09-18',
        overview: "Two lost souls visiting Tokyo -- the young, neglected wife of a photographer and awashed-up movie star shooting a TV commercial -- find an odd solace and pensive freedom to be real in each other's company, away from their lives in America.",
        poster_path: '/wkSzJs7oMf8MIr9CQVICsvRfwA7.jpg',
        title: 'Lost in Translation',
        genre_ids: [35, 18, 10749],
        original_language: 'en'
    }
]



describe('Home', () => {
    it('renders a heading', () => {
        // @ts-ignore
        const {container} = render(<Home movies={movies} />)

        const heading = screen.getByRole('heading', {
            name: /WELCOME TO OKKORO/i,
        })

        expect(heading).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })
})
