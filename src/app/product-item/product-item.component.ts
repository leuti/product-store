import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/Product';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  width: number = 300;
  height: number = 200;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.product = {
      id: 0,
      title: '',
      description: '',
      imageFile: '',
      quantity: 0,
      price: 0,
    };
  }

  ngOnInit(): void {}

  addToCart(product: Product): void {
    product.quantity += 1;
    this.shoppingCartService.addToCart(product);
    console.log(`Product with title: ${product.title} added`);
  }
}
