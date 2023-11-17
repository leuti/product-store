// external modules
import { Component, OnInit } from '@angular/core';
// internal services & models
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  product: Product = {
    id: 0,
    title: '',
    description: '',
    imageFile: '',
    price: 0,
    quantity: 0,
  };
  width: number = 300;
  height: number = 200;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.product = this.productService.getSelectedProduct(); // sets the focus to currently selected product
  }

  // When add to cart button is pressed, the quantity is set / increased
  addToCart(product: Product): void {
    // Set quantity to 1 if qantity is empty or 0
    if (product.quantity !== undefined || product.quantity === 0) {
      product.quantity = 1;
    }

    this.shoppingCartService.addToCart(product); // product is added to cart
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      if (product.quantity === 0) {
        // remove item from cart
        this.shoppingCartService.decreaseQuantity(product);
      }
    }
  }

  increaseQuantity(product: Product) {
    product.quantity += 1;
  }
}
