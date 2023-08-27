import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
}
