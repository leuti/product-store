import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product = this.productService.getSelectedProduct();
  }
}
