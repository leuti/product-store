// external modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// internal services & models
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderDetails } from '../models/OrderDetails';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-cart-ordered',
  templateUrl: './cart-ordered.component.html',
  styleUrls: ['./cart-ordered.component.css'],
})
export class CartOrderedComponent implements OnInit {
  orderDetails: OrderDetails = {
    fullName: '',
    totalPrice: 0,
  };
  cartItems: CartItem[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderDetails = this.shoppingCartService.getOrderSuccess(); // get contend of ordered details
  }

  // clears the cart content locally and on service level
  clearCart() {
    this.shoppingCartService.clearCart();
    this.cartItems = [];
    this.router.navigate(['']);
  }
}
