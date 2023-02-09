/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// @ts-ignore
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../lib/firebase";

Cypress.Commands.add('loginByGoogleApi', () => {
    cy.log('Logging in to Google')
    cy.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        body: {
            grant_type: 'refresh_token',
            client_id: Cypress.env('googleClientId'),
            client_secret: Cypress.env('googleClientSecret'),
            refresh_token: Cypress.env('googleRefreshToken'),
        },

    }).then(({ body }) => {
        const { access_token, id_token } = body
        cy.log(body)
        cy.request({
            method: 'GET',
            url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            headers: { Authorization: `Bearer ${access_token}` },
        }).then(({ body }) => {
            cy.log(body)
            const userItem = {
                token: id_token,
                user: {
                    googleId: body.sub,
                    email: body.email,
                    givenName: body.given_name,
                    familyName: body.family_name,
                    imageUrl: body.picture,
                },
            }
            window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
            cy.visit('/')
        })
    })
})

Cypress.Commands.add(
    'signIn',
    (
        redirectPath = '/',
        credentials = {
            email: "TestUserOkkoro@gmail.com" as string,
            password: "OkkoroTestPassword123$" as string,
        }
    ) => {
        cy.session([credentials.email, credentials.password],
            () => {
                console.log("test")
                signInProgrammatically(credentials);
            }
        );

        cy.visit(redirectPath);
    }
);

export function signInProgrammatically({
                                           email,
                                           password,
                                       }: {
    email: string;
    password: string;
}) {

    console.log("A: "+auth+"mail: "+email+"pass: "+password)

    const signIn = signInWithEmailAndPassword(
        auth,
        email,
        password
    ).then(

    )
        .catch((e) => {
            console.error(e);
        });

    return cy.wrap(signIn);
}

export {}