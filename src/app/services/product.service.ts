import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts() {
    return [
      {
        id: 1,
        title: 'product 1',
        description: 'description of product 1',
        pictureUrl: 'www.picture.ch',
        quantity: 0,
        price: 123,
      },
      {
        id: 2,
        title: 'product 2',
        description: 'description of product 2',
        pictureUrl: 'www.picture.ch',
        quantity: 0,
        price: 123,
      },
      {
        id: 3,
        title: 'product 3',
        description: 'description of product 3',
        pictureUrl: 'www.picture.ch',
        quantity: 0,
        price: 123,
      },
      {
        id: 4,
        title: 'product 4',
        description: 'description of product 4',
        pictureUrl: 'www.picture.ch',
        quantity: 0,
        price: 123,
      },
      {
        id: 5,
        title: 'product 5',
        description: 'description of product 5',
        pictureUrl: 'www.picture.ch',
        quantity: 0,
        price: 123,
      },
      {
        id: 6,
        title: 'product 6',
        pictureUrl: 'www.picture.ch',
        quantity: 0,
        description: 'description of product 6',
        price: 123,
      },
    ];
  }
}
