import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;

  constructor() {
    this.cartItem = {
      id: 0,
      title: '',
      description: '',
      pictureUrl: '',
      quantity: 0,
      price: 0,
    };
  }

  ngOnInit(): void {}
}
