// external modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// internal services & models
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  @Input() product: Product; // get product fromo parent
  @Output() productAddedToCart: EventEmitter<Product> = new EventEmitter();
  width: number = 300;
  height: number = 200; // used to render images in correct size
  addedMsg: boolean = false;
  removedMsg: boolean = false;

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

  // when a product is clicked, the detail view is opened
  productClicked(): void {
    this.productService.setSelectedProduct(this.product); // set current product
    this.router.navigate(['/product-detail']); // navigate to detail view
  }

  // This function was added as Udacity required the implementation of @Output
  addToCart(product: Product): void {
    this.productAddedToCart.emit(product);
    this.showAddedMsg();
  }

  // When add to cart button is pressed, the quantity is set / increased
  /* This function has be replaced by the addToCart above (to emplement the Emitter)
  addToCart(product: Product): void {
    // Set quantity to 1 if qantity is empty or 0
    if (product.quantity !== undefined || product.quantity === 0) {
      product.quantity = 1;
    }

    this.shoppingCartService.addToCart(product); // product is added to cart
  }*/

  // Fires when user clicks the "-" on the UI
  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.shoppingCartService.decreaseQuantity(product);
    } else if (product.quantity === 1) {
      product.quantity -= 1;
      this.shoppingCartService.decreaseQuantity(product);
      this.showRemovedMsg();
    }
  }

  // Fires when user clicks the "+" on the UI
  increaseQuantity(product: Product) {
    product.quantity += 1;
    this.shoppingCartService.addToCart(product);
  }

  showAddedMsg(): void {
    this.addedMsg = true;
    setTimeout(() => {
      this.addedMsg = false;
    }, 5000);
  }

  showRemovedMsg() {
    this.removedMsg = true;
    setTimeout(() => {
      this.removedMsg = false;
    }, 5000);
  }
}
