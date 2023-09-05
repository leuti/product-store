# Feedback to Udacity

## Beset Practise - Design for user experience

### Reviewer Note

Input forms are validated - Though the form validation has been implemented in a very basic form by adding attributes to the input controls such as minlength , required etc. , no real time form validation status is provided to the end user. This has been covered in detail in the Lesson 5 Part 9 Form Validation. Please consider implementing this in the re submission too. Only numbers should be allowed in the credit card field and not text. You can use the pattern attribute in the input field to allow only numbers.

### My response

Requested feature implemented

### Reviewer Note

Feedback is given to the user when the cart is modified - No alerts are shown when item is added to or removed from cart:

### My response

I do not like the alert as it is breaking up user experience. I indicate that the item is in the cart by changing the button. When reducing the quantity to 0 the button turns blue again. When I delete an item from the cart completely, it disappears from the cart and the number of items counter is adjusted.
I would add the statement "alert('item removed!')" if really required.

### Reviewer Note

The details page for a product shows a photo of the product, the name, the price, and the description - Image does not load correctly.

### My response

Issue fixed

### Reviewer Note

Products can be removed from the cart -Individual items cannot be removed from cart.

### My response

Requested feature implemented

### Reviewer Note

The functionality to increase or decrease item quantity is implemented BUT when adding to the cart, only 1 unit is always added.

### My response

Issue fixed

## Components - Collect input from the user using controlled form elements and Angular events

### Reviewer Note

ngModelChange has been used to listen to changes in ngModel instead of the DOM event change.
ngModel is used on the element to bind a form control to a data property. ngModelChange is used to listen to any ngModel changes (i.e., rather than change).

### My response

Requested feature implemented

## Data Flow - Use decorators to pass data between parent and child components

### Reviewer Note

However, the rubric also requires the use of @Output decorator for passing data back to a parent component alongwith the use of EventEmitter class. Please note that although your application works fine without using @Output decorator, since the rubric requirement mentions using it and the course videos cover it too, you are required to do so for a passing submission.

### My response

Requested feature implemented
