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
        console.log(
          `products.component: cartItems found (length): ${cartItems.length}`
        );

        cartItems.forEach((item) => {
          const product = this.products.find((prod) => prod.id === item.id);
          if (product) {
            product.quantity = item.quantity;
            console.log(`Updating quantity in products`);
          }
          console.log(
            `products.component: products updated: ${JSON.stringify(
              this.products
            )}`
          );
        });
      } else {
        console.log(
          `products.component: cartItems NOT found: ${JSON.stringify(
            cartItems
          )}`
        );
      }
    });
  }
}
