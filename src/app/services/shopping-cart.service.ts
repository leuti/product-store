import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  cartList: CartItem[] = [];

  constructor() {}

  getCartContent() {
    return this.cartList;
  }

  addToCart(product: Product) {
    this.cartList.push(product);
    return this.cartList;
  }

  removeFromCart() {}

  clearCart() {}
}
