// extrnal modules
import { Component, OnInit } from '@angular/core';
// // internal services & models
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title: string = 'Products List';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    // get products from API
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.filteredProducts = [...this.products]; // this array contains the filtered products
      const cartItems: CartItem[] = this.shoppingCartService.getCartContent(); // load content of the cart

      // Update the product quantities on the UI if cart has already been filled
      if (cartItems.length >= 1) {
        cartItems.forEach((item) => {
          const product = this.products.find((prod) => prod.id === item.id);
          if (product) {
            product.quantity = item.quantity;
          }
        });
      } else {
        // Set product quantity to 0 if not yet available in cart
        this.products = this.products.map((product) => ({
          ...product,
          quantity: 0,
        }));
      }
    });
  }

  // allows to filter for specific products
  filterProducts() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  // This function was added as Udacity required the implementation of @Output
  handleProductAddedToCart(product: Product) {
    // Set quantity to 1 if qantity is empty or 0
    if (product.quantity !== undefined || product.quantity === 0) {
      product.quantity = 1;
    }

    this.shoppingCartService.addToCart(product); // product is added to cart
  }
}
