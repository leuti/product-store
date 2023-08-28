// external modules
import { Component, OnInit } from '@angular/core';
// internal services & models
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  title: string = 'Your Shopping Cart';
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartItems = this.shoppingCartService.getCartContent(); // get cart content
  }

  // compute total price of the cart (ACTION: move to shoppingCartServices)
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (acc, cartItem) =>
        acc + cartItem.price * (cartItem.quantity ? cartItem.quantity : 0),
      0
    );
  }

  // This will be called whenever a product quantity changes
  onQuantityChange(event: any, cartItem: CartItem): void {
    cartItem.quantity = Number(event.target.value);
  }

  // clears the cart content locally and on service level
  clearCart() {
    this.shoppingCartService.clearCart();
    this.cartItems = [];
    alert('Cart cleared.');
  }
}
