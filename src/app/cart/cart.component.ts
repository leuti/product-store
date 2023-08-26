import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartList: CartItem[] = [];
  constructor(private shoppingCartService: ShoppingCartService) {}
  ngOnInit(): void {
    this.cartList = this.shoppingCartService.getCartContent();
  }

  clearCart() {}
}
