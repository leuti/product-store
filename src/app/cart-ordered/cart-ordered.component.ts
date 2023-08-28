// external modules
import { Component, OnInit } from '@angular/core';
// internal services & models
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderDetails } from '../models/OrderDetails';

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

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.orderDetails = this.shoppingCartService.getOrderSuccess();
  }
}
