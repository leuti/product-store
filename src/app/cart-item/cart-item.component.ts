// external modules
import { Component, OnInit, Input } from '@angular/core';

// internal services & models
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/Product';
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
  product = {
    id: 0,
    title: '',
    description: '',
    imageFile: '',
    quantity: 0,
    price: 0,
  };

  constructor(private shoppingCartService: ShoppingCartService) {
    this.cartItem = {
      id: 0,
      title: '',
      imageFile: '',
      quantity: 0,
      price: 0,
    };
  }

  ngOnInit(): void {}

  removeItem(cartItem: CartItem) {
    this.product.id = cartItem.id;
    this.product.title = cartItem.title;
    this.product.imageFile = cartItem.imageFile;
    this.product.quantity = cartItem.quantity;
    this.product.price = cartItem.price;
    this.shoppingCartService.removeFromCart(this.product);
  }
}
