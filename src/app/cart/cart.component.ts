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
  cartList: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartList = this.shoppingCartService.getCartContent();
  }

  // compute total price of the cart
  getTotalPrice(): number {
    return this.cartList.reduce(
      (acc, cartItem) =>
        acc + cartItem.price * (cartItem.quantity ? cartItem.quantity : 0),
      0
    );
  }

  // This will be called whenever a product quantity changes
  onQuantityChange(event: any, cartItem: CartItem): void {
    cartItem.quantity = Number(event.target.value);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
    this.cartList = [];
    alert('Cart cleared.');
  }
}
