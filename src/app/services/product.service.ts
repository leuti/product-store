import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedProduct: Product = {
    id: 0,
    title: '',
    description: '',
    imageFile: '',
    price: 0,
    quantity: 0,
  };

  private orderDetails: OrderDetails = {
    fullName: '',
    totalPrice: 0,
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    console.log(`product.service - getProducts reached`);
    return this.http.get<Product[]>('http://localhost:3000/products').pipe(
      map((products) => {
        return products.map((product) => {
          return { ...product, quantity: 0 };
        });
      })
    );
  }

  setSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): Product {
    return this.selectedProduct;
  }

  setOrderSuccess(fullName: string, totalPrice: number): void {
    this.orderDetails = { fullName, totalPrice };
    console.log(`Order details set: ${JSON.stringify(this.orderDetails)}`);
  }

  getOrderSuccess(): OrderDetails {
    console.log(`Get Order details: ${JSON.stringify(this.orderDetails)}`);
    return this.orderDetails;
  }
}
