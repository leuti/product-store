export class Product {
  id: number;
  title: string;
  description: string;
  pictureUrl: string;
  quantity: number;
  price: number;

  constructor() {
    this.id = 1;
    this.title = '';
    this.description = '';
    this.pictureUrl = '';
    this.quantity = 0;
    this.price = 0;
  }
}
