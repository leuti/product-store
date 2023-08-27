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
    // get array index of cartItem
    const cartIndex = this.cartList.findIndex((prod) => prod.id == product.id);

    // If the cartItem is not yet existing in the cartList, it is added
    if (cartIndex === -1) {
      this.cartList.push({
        id: product.id,
        title: product.title,
        imageFile: product.imageFile,
        price: product.price,
        quantity: product.quantity,
      });
    } else {
      // If it is already existing, I overwrite the existing quantity
      this.cartList[cartIndex].quantity = product.quantity;
    }
    return this.cartList;
  }

  removeFromCart() {}

  clearCart() {
    this.cartList = [];
    return this.cartList;
  }
}
