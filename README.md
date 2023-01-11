# Okkoro Overview
https://okkoro.vercel.app/

A responsive movie tracking, recommendation and review webapp

Front-end built on Next.JS with React and Firebase
Tested with Cypress and Jest
Hosted on Vercel

## Dev Environment
Uses ESLint for next and cypress - might be disabled by default (in WebStorm at least)

Useful commands:
* `npm run dev`: start development server @http://localhost:3000/
* `next build`: build next application - make sure no errors here else won't deploy
* `npm test`: start Jest tests with automatic file watching - currently broken due to CJS/EMS transpiling issue, certain components are untestable
* `npm cypress`: open Cypress console with automatic file watching

## Deployment
Automatic deployment of `main` to vercel @https://okkoro.vercel.app/
