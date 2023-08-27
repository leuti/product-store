import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../models/OrderDetails';
import { ProductService } from '../services/product.service';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.orderDetails = this.productService.getOrderSuccess();
  }
}
