import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  cartList: CartItem[] = [];

  constructor() {}

  getCartContent() {
    return this.cartList;
  }

  addToCart() {}

  removeFromCart() {}

  clearCart() {}
}
