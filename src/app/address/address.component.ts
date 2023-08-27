import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Input() getTotalPrice!: () => number;
  cartList: CartItem[] = [];
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.cartList = this.shoppingCartService.getCartContent();
  }

  submitOrder(): void {
    this.productService.setOrderSuccess(this.fullName, this.getTotalPrice());
    this.router.navigate(['order-success']);
  }
}
