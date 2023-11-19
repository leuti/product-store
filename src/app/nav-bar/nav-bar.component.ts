// external modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// internal services & models
import { UserService } from '../services/user.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean = false;
  cartCount: number = 0;
  private subscription: Subscription = new Subscription();
  private cartSubscription: Subscription = new Subscription();
  envName = environment.envName;

  constructor(
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.userLoggedIn$.subscribe(
      (value: boolean) => {
        this.userLoggedIn = value;
      }
    );

    this.cartSubscription = this.shoppingCartService.cartItemsCount$.subscribe(
      (count) => {
        this.cartCount = count;
      }
    );
  }

  logoffUser() {
    this.userService.logoffUser();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
