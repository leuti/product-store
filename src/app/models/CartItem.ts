export class CartItem {
  id: number;
  title: string;
  imageFile: string;
  quantity: number;
  price: number;

  constructor() {
    this.id = 1;
    this.title = '';
    this.imageFile = '';
    this.quantity = 0;
    this.price = 0;
  }
}
