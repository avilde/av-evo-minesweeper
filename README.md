# AV Mine Sweeper

## Description
My home work assignment project from `Evolution Gaming`. 


![AV Mine Sweeper](docs/av-mine-sweeper.gif)
#### [Demo](https://av-evo-minesweeper.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f0d58a61-ba1f-41fa-854f-21b922521f9a/deploy-status)](https://app.netlify.com/sites/av-evo-minesweeper/deploys)

## Features
  - 3 modes 💣reveal (default), 🚩 - flag a mine, ❓ - guess (when mine is not 100% there) 
  - responsive layout <br/><br/>
  ![responsive layout](docs/responsive.gif)
  - mobile layout <br/><br/>
  ![mobile layout](docs/mobile.png)
  - some accessibility  (rem units, mobile friendly (bigger click area), aria-labels)
  - debugging in dev mode

## Technologies Used
* React (CRA boilerplate)
* Typescript
* Web Sockets

## Setup
`npm ci` perform a clean install inside root folder to setup project for
development

## Scripts

### `npm start`
Runs the app in the development mode.<br />
Development server: [http://localhost:3000](http://localhost:3000) 

### `npm test`
Launches the test runner in the interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## TODO
- improve cell drawing performance for expert mode
