// external modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// internal services & models
import { UserService } from '../services/user.service';
import { User } from '../models/Users';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  user: User = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  };
  token: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // register user
  register(user: User): void {
    // register user
    this.userService.registerUser(user).subscribe({
      next: (res) => {
        if (res && !res.message) {
          this.token = res;
          this.userService.storeToken(this.token); // store token in localStorage
          this.userService.setUserData(this.token); // store user data in localStorage
          this.userService.setUserLoggedIn(true); // user has logged in
          this.router.navigate(['cart']); // navigate to cart
        }
      },
      error: (err: any) => {
        this.errorMessage = err.message || 'An error occurred';
        console.error(`Error: ${this.errorMessage}`);
      },
    });
  }
}
