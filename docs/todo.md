# TO DO's

## General

- MUST: Document code
- MUST: Write README.md
- remove console logs
- all buttons should be grayed out if form not valid

## API

## NavBar

- 2 Cart button is inactive when cart is empty
- 2 Icon Cart (with number of products in cart) --> 🛒 [3]

## Products

- 2 quantity field as drop down
- BUG: When I enter a number into the quantity field and press the Add to Cart Button again, 1 is added to the end of the number (no addition)
- BUG: I can add non numbers to quantity. Ensure that only digits can be added
- 3 Button to reduce quantities
- Expand text if requested

## ProductDetails

- 2 Link "back to product list"
- BUG: I can add non numbers to quantity. Ensure that only digits can be added

## Cart

- BUG: I have items in my cart. I press the Clear Cart button. I would expect the Clear Button to disappear as the countItems var should be 0
- 2 display "Cart empty" if nothing is in cart
- 3 total price --> rounding
- 3 +/- to adjust quantities

## Success page

- 2 Beautify
- 2 Implement return to product list button

## Address component

- Defect: Fullname not displayed

## Login

### User service

### Login component

### Register component

- After first register click, the user is added to the DB, but the route is not changing to cart

### Authentication

- Authentication: Check if expired toakens (if implemented)
- checkTokenAtStartup: authenticate user with token
- Switch to HttpOnly Cookies (see ChatGPT chat "Angular")
- Switch to https (see ChatGPT chat "Angular")
- Implement token Rotation

### My-Order-Component

- New component
