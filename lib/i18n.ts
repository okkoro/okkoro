import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    navbarMovies: "Movies",
                    navbarLogIn: "Log in",
                    landingWelcome: "WELCOME TO OKKORO",
                    landingGenre: "Genre",

                    moviesAddReview: "Add Review",
                    moviesEditReview: "Edit Review",
                    moviesLogInRequired: "Log in to add a review",
                    moviesAddToList: "Add to list",
                    movieReviewLabel: "Reviews:",
                    moviesReviewCreateSuccess: "Review created!",
                    moviesReviewCreateFailure: "Failed to create review",
                    moviesReviewUpdateSuccess: "Review updated!",
                    moviesReviewUpdateFailure: "Failed to update review",
                    moviesReviewAddReviewModalHeader: "Add a review for:",
                    moviesReviewEditReviewModalHeader: "Edit review for:",
                    moviesReviewScoreFormLabel: "Score:",
                    moviesReviewTextFormLabel: "Review Text:",
                    moviesReviewScore1: "Disgusting",
                    moviesReviewScore2: "Terrible",
                    moviesReviewScore3: "Really bad",
                    moviesReviewScore4: "Just Bad",
                    moviesReviewScore5: "Average",
                    moviesReviewScore6: "Passable",
                    moviesReviewScore7: "Good",
                    moviesReviewScore8: "Really Good",
                    moviesReviewScore9: "Great",
                    moviesReviewScore10: "Masterpiece",
                    moviesListSuccess: "Added movie to list!",
                    moviesListFailure: "Could not add movie to list - is it already in it?",
                    moviesListFormHeader: "Add {{title}} to list:",
                    save: "Save",



                }
            },
            fr: {
                translation: {
                    navbarMovies: "Films",
                    navbarLogIn: "Enregistrer",
                    landingWelcome: "BIENVENUE À OKKORO",
                    landingGenre: "Genre",

                    moviesAddReview: "Ajouter une critique",
                    moviesEditReview: "Modifier votre critique",
                    moviesLogInRequired: "Connectez-vous pour ajouter une critique",
                    moviesAddToList: "Ajouter à une liste",
                    movieReviewLabel: "Critiques:",
                    moviesReviewCreateSuccess: "Critique créé!",
                    moviesReviewCreateFailure: "La critique n'a pas été publiée",
                    moviesReviewUpdateSuccess: "Critique modifiée!",
                    moviesReviewUpdateFailure: "La critique n'a pas été modifiée",
                    moviesReviewAddReviewModalHeader: "Ajouter votre critique de:",
                    moviesReviewEditReviewModalHeader: "Modifier votre critique de:",
                    moviesReviewScoreFormLabel: "Note:",
                    moviesReviewTextFormLabel: "Texte de critique:",
                    moviesReviewScore1: "Dégoûtant",
                    moviesReviewScore2: "Terrible",
                    moviesReviewScore3: "Vraiment mauvais",
                    moviesReviewScore4: "Juste mauvais",
                    moviesReviewScore5: "Moyen",
                    moviesReviewScore6: "Passable",
                    moviesReviewScore7: "Bien",
                    moviesReviewScore8: "Très bien",
                    moviesReviewScore9: "Super",
                    moviesReviewScore10: "Chef-d'œuvre",
                    moviesListSuccess: "Film ajouté à la liste!",
                    moviesListFailure: "Impossible d'ajouter le film à la liste - y est-il déjà?",
                    moviesListFormHeader: "Ajouter {{title}} à la liste:",
                    save: "Sauvegarder",



                }
            }
        }
    });

export default i18n;