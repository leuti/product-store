// external modules
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// internal services & models
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { OrderDetails } from '../models/OrderDetails';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  cartItems: CartItem[] = [];
  private cartItemsCount = new BehaviorSubject<number>(0); // Initialize with 0 items.
  public cartItemsCount$: Observable<number> =
    this.cartItemsCount.asObservable(); // Expose the observable for components to subscribe
  private orderDetails: OrderDetails = {
    fullName: '',
    totalPrice: 0,
  };

  constructor() {}

  getCartContent() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    // get array index of cartItem
    const cartIndex = this.cartItems.findIndex((prod) => prod.id == product.id);

    // If the cartItem is not yet existing in the cartItems, it is added
    if (cartIndex === -1) {
      this.cartItems.push({
        id: product.id,
        title: product.title,
        imageFile: product.imageFile,
        price: product.price,
        quantity: product.quantity,
      });

      // Update the cartItemsCount
      const currentCount = this.cartItemsCount.value;
      this.cartItemsCount.next(currentCount + 1);
      //alert('Item added to cart');
    } else {
      // If it is already existing, I overwrite the existing quantity
      this.cartItems[cartIndex].quantity = product.quantity;
    }
    return this.cartItems;
  }

  removeFromCart(product: Product): void {
    // get array index of cartItem
    const cartIndex = this.cartItems.findIndex((prod) => prod.id == product.id);

    // If the cartItem is is found, it is removed from the array
    if (cartIndex !== -1) {
      this.cartItems.splice(cartIndex, 1);
    } else {
      this.cartItems = [];
    }
    const currentCount = this.cartItemsCount.value;
    this.cartItemsCount.next(currentCount - 1);
  }

  decreaseQuantity(product: Product): void {
    // get array index of cartItem
    const cartIndex = this.cartItems.findIndex((prod) => prod.id == product.id);
    // if cartItem found and current quantity is larger than 1 (reduction does not lead to 0)
    if (cartIndex !== -1 && this.cartItems[cartIndex].quantity > 1) {
      this.cartItems[cartIndex].quantity -= 1; // reduce the quanity in the cartItems array
    } else {
      const currentCount = this.cartItemsCount.value;
      this.cartItemsCount.next(currentCount - 1);
      this.cartItems.splice(cartIndex, 1);
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsCount.next(0);
  }

  setOrderSuccess(fullName: string, totalPrice: number): void {
    this.orderDetails = { fullName, totalPrice };
  }

  getOrderSuccess(): OrderDetails {
    return this.orderDetails;
  }
}
