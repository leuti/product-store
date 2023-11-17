// external modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// internal services & models
import { Product } from '../models/Product';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {}

  // call the API and get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`).pipe(
      map((products) => {
        return products.map((product) => {
          return { ...product, quantity: 0 }; // add field quantity to every product
        });
      })
    );
  }

  // the selectedProduct becomes the current product
  setSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }

  // returns the currently selected product
  getSelectedProduct(): Product {
    return this.selectedProduct;
  }
}
