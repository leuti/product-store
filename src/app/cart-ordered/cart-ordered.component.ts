import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../models/OrderDetails';
import { ShoppingCartService } from '../services/shopping-cart.service';

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
