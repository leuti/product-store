// external modules
import { Component, OnInit, Input } from '@angular/core';
// internal services & models
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  width: number = 150;
  height: number = 100; // used to render image in correct size

  constructor() {
    this.cartItem = {
      id: 0,
      title: '',
      imageFile: '',
      quantity: 0,
      price: 0,
    };
  }

  ngOnInit(): void {}
}
