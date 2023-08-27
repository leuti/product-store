import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title: string = 'Products List';
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      const cartItems: CartItem[] = this.shoppingCartService.getCartContent();

      if (cartItems.length >= 1) {
        cartItems.forEach((item) => {
          const product = this.products.find((prod) => prod.id === item.id);
          if (product) {
            product.quantity = item.quantity;
          }
        });
      } else {
        this.products = this.products.map((product) => ({
          ...product,
          quantity: 0,
        }));
      }
    });
  }
}
