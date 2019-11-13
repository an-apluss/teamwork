[![Build Status](https://travis-ci.org/an-apluss/teamwork.svg?branch=develop)](https://travis-ci.org/an-apluss/teamwork) [![Coverage Status](https://coveralls.io/repos/github/an-apluss/teamwork/badge.svg?branch=develop)](https://coveralls.io/github/an-apluss/teamwork?branch=develop) [![Test Coverage](https://api.codeclimate.com/v1/badges/9ac4ca1816f190cac29a/test_coverage)](https://codeclimate.com/github/an-apluss/teamwork/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/9ac4ca1816f190cac29a/maintainability)](https://codeclimate.com/github/an-apluss/teamwork/maintainability)

# Teamwork
Teamwork is an internal social network for employees of an organisation. The goal of this application is to facilitate more interaction between colleagues and promote team bonding

### Github Project Card

Project is currently being built with the Project Management Tool; Github Project. You can find the stories at https://github.com/an-apluss/teamwork/projects/1

### API Deployment

API deployment URL - https://web-teamwork.herokuapp.com

### API Documentation

API documentation URL - https://web-teamwork.herokuapp.com/documentation

## Built With

<ul>
<li><a href="https://nodejs.org/">NodeJS</a></li>
<li><a href="https://expressjs.com/">ExpressJS</a></li>
<li><a href="https://www.postgresql.org/docs">PostgreSQL</a></li>
<li><a href="https://cloudinary.com/">Cloundinary</a></li>
<li><a href="https://developer.mozilla.org/bm/docs/Web/JavaScript">JavaScript</a></li>
</ul>

## Getting Started

### Installation

- Clone this repository using `git clone https://github.com/an-apluss/teamwork.git .`
- Use the `.env.example` file to setup your environment variables and rename the file to `.env`
- Run `npm install` to install all dependencies
- Run `npm start` to start the server

### Supporting Packages

#### Linter

- [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

- [Babel](https://babeljs.io/) - Compiler for Next Generation JavaScript

#### Test Tools

- [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
- [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
- [Chai-http](https://github.com/visionmedia/supertest) - A Chai plugin for testing node.js HTTP servers
- [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator

<ul><li>Run Test</li></ul>
<pre><code>npm test</code></pre>
<br>
<ul><li>Run Coverage Report</li></ul>
<pre><code>npm run coverage</code></pre>
<br>

### API Routes

|        DESCRIPTION                            | HTTP METHOD | ROUTES                                  |
| :-------------------------------------------: | ----------- | --------------------------------------- |
| Create user account                           | POST        | /api/v1/auth/create-user                |
| Login a user                                  | POST        | /api/v1/auth/signin                     |
| Create a gif                                  | POST        | /api/v1/gifs                            |
| Create an article                             | POST        | /api/v1/articles                        |
| Edit an article                               | PATCH       | /api/v1/articles/<:articleId>           |
| Employees can delete their articles           | DELETE      | /api/v1/articles/<:articleId>           |
| Employees can delete their gifs               | DELETE      | /api/v1/gifs/<:gifId>                   |
| Employees can comment on other colleagues'    |             |                                         |
| article post                                  | POST        | /api/v1/articles/<:articleId>/comment   |
| Employees can comment on other colleagues'    |             |                                         |
| gif post                                      | POST        | /api/v1/gifs/<:gifId>/comment           |
| Employees can view all articles or gifs,      |             |                                         |
| showing the most recently posted articles     |             |                                         |
| or gifs first                                 | GET         | /api/v1/feed                            |
| Employees can view a specific article         | GET         | /api/v1/articles/<:articleId>           |
| Employees can view a specific gif             | GET         | /api/v1/gifs/<:gifId>                   |

## Project References

- I learnt how to structure my project from a video tuturial by Bolaji Olajide - https://www.youtube.com/watch?v=WLIqvJzD9DE
- I learnt how to used bycrpt and jwt dependencies and how to capture the big picture of an application before writing code, from a video course created by Will Alexander - Go Full-Stack With Node.js, Express, and MongoDB | https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb
- I learnt how to persist data into database with nodejs from an article curated by Olawale Aladeusi - Building a simple API with Nodejs, Expressjs and PostgreSQL DB - 2 | https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
- Stackoverflow was also a blessing whenever I come across question I can't answer
- Google

## License

&copy; Anuoluwapo Akinseye

Licensed under the [MIT License](https://github.com/an-apluss/teamwork/blob/develop/LICENSE)