import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
//import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  width: number = 300;
  height: number = 200;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private router: Router
  ) {
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

  productClicked(): void {
    this.productService.setSelectedProduct(this.product);
    this.router.navigate(['/product-detail']);
  }

  addToCart(product: Product): void {
    // Set quantity to 1 if qantity is empty or 0
    if (product.quantity !== undefined) {
      product.quantity += 1;
    } else {
      product.quantity = 1;
    }

    this.shoppingCartService.addToCart(product);
  }
}
