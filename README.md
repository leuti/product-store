# product-store Front-end

## Getting Started

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

The product-store is a Udacity project deliverable. It offers the basic functions of a webshop. Its written AngularJS and interacts with the API built during a previous project.

Please ensure that the product-store API is running on the local machine. For download and instructions --> https://github.com/leuti/product-api.git.

## Required modules

This application makes use of the following libraries (incomplete list. See package.JSON for all dependencies):

- angular (several packages)
- typescript
- bootstrap
- rxjs

## Steps to installation (details below)

- git clone https://github.com/leuti/product-store.git
- Run the command "npm install" to install all required packages
- Install the product-store API --> follow instructions here: https://github.com/leuti/product-api.git

## All scripts described:

- ng serve: Run `ng serve` for a dev server. Navigate to `http://shopping-api-env.eba-8rhccdks.eu-central-1.elasticbeanstalk.com:4200/`. The application will automatically reload if you change any of the source files
- npm run start: same as ng serve
- npm run build: Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory
- npm run watch: runs the application in watch mode
- npm run test (no tests implemented): Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io)

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Concepts and components

### Component hierarchy

app/
|
|-- nav-bar
|-- products/
| |-- product-item
|-- product-detail
|-- cart/
| |-- cart-item
| |-- address
|-- cart-ordered
|-- user-login
|-- user-register

### Services

services/
|
|-- ProductService/
| |-- function getProducts
| |-- function setSelectedProduct
| |-- function getSelectedProduct

|-- ShoppingCartService/
| |-- function getCartContent
| |-- function addToCart
| |-- function removeFromCart
| |-- function clearCart
| |-- function setOrderSuccess
| |-- function getOrderSuccess

|-- UserService/
| |-- function registerUser
| |-- loginUser
| |-- logoffUser
| |-- storeToken
| |-- setUserLoggedIn
| |-- getUserLoggedIn
| |-- setUserData
| |-- getUserData
| |-- decodeJwt
