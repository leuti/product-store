// external modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// internal services & models
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Input() getTotalPrice!: () => number; // function to calculate total price
  cartItems: CartItem[] = [];
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.shoppingCartService.getCartContent(); // get current cartItems
  }

  // Data for order checkout (success) is collected and view opened
  submitOrder(): void {
    this.shoppingCartService.setOrderSuccess(
      this.fullName,
      this.getTotalPrice()
    );
    this.router.navigate(['order-success']);
  }
}
