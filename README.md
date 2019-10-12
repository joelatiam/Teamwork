![Teamwork Logo](UI/img/logo.png)

[![Maintainability](https://api.codeclimate.com/v1/badges/d2bae7534b764f580476/maintainability)](https://codeclimate.com/github/joelatiam/Teamwork/maintainability)  [![Build Status](https://travis-ci.org/joelatiam/Teamwork.svg?branch=develop)](https://travis-ci.org/joelatiam/Teamwork)  [![Coverage Status](https://coveralls.io/repos/github/joelatiam/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/joelatiam/Teamwork?branch=develop)
# Teamwork


**Teamwork** is an **internal social network** for organizations’ _**employees**_. 
The goal of this application is to facilitate more _**interaction**_ between colleagues and facilitate _**team bonding**_. 

## Getting started

###Installing
- Clone this repository
- Have Postgres installed
- Have nodejs installed
- Have all the packages the package.json installed

###Running
- Start the app `npm start`

- Units Test `npm test`

## References
#### [UI](https://joelatiam.github.io/Teamwork/UI/html/)
#### [API](https://teamwork-kg11.herokuapp.com/api/v2/)
 [API DOC](https://teamwork-kg11.herokuapp.com/api/v2/docs/)
##### Endpoints
| Role  | Method  | Endpoint  |
| ------------ | ------------ | ------------ |
| Create Account  | POST  | /auth/signup  |
|  Login a user | POST | /auth/signin  |
| Create an article  | POST  | /articles/  |
|  Edit an article | PATCH  | /articles/{articleID}  |
|  View a specific article | GET  | /articles/{articleID}  |
| Comment on a article  | POST  |  /articles/{articleID}/comments |
|  view all articles | GET  |  /feeds |
| Delete an article  | DELETE  |  /articles/{articleID} |

Built with
------------
UI : HTML5/CSS3 + ES6, Host: Github Pages
API: ES6(Express/Nodejs), Test: Chai/Mocha , Database: Postgres SQL, Host: Heroku
