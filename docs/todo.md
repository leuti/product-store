# TO DO's

## API

## NavBar

- 2 Cart button is inactive when cart is empty
- 2 Layout
- 2 Logout button
- 2 Icon Cart (with number of products in cart) --> 🛒 [3]

## Products

- 2 quantity field as drop down
- 2 Form validation for quantity
- 3 Button to reduce quantities

## ProductDetails

- 2 Link "back to product list"

## Cart

- 2 remove product button from cart
- 2 move setOrderSuccess & getOrderSuccess function to
- 2 display "Cart empty" if nothing is in cart
- 3 total price --> rounding
- 3 +/- to adjust quantities

## Success page

- 2 Beautify
- 2 Implement return to product list button

## Address component

- Vadate form data

## Login

### User service

- Logoff function

### 1 Login component

- 1 setUserLoggedIn = true
- 1 Ensure that login is unique

### 1 Register component

### Authentication

- setUserLoggedIn to take boolean to userLoggedIn state
- Error handling
  -- Registration: Login already exists; data incomplete; other error
  -- Login: Login not existing; password not correct; other error
  -- Authentication: Check of expired toakens (if implemented)

- API to only return token
- Get user details via separate API call
- Implement caching of user data on API side (optional)
- Rotate tokens

- checkTokenAtStartup: authenticate user with token

- Switch to HttpOnly Cookies (see ChatGPT chat "Angular")
- Switch to https (see ChatGPT chat "Angular")
- Implement token Rotation
