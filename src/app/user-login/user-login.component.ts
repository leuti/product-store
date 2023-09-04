// external modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// internal services & models
import { UserService } from '../services/user.service';
import { User } from '../models/Users';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  login: string = '';
  password: string = '';
  token: string = '';
  user: User = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  loginUser(login: string, password: string): void {
    // authenticate user
    this.userService.loginUser(login, password).subscribe({
      next: (res) => {
        if (res && !res.message) {
          this.token = res;
          this.userService.storeToken(this.token); // store token in localStorage
          this.userService.setUserData(this.token); // get and store user data in localStorage
          this.userService.setUserLoggedIn(true); // user has logged in
          this.router.navigate(['cart']); // navigate to carts
        }
      },
      error: (err: any) => {
        if (err.state === 401) {
          this.errorMessage = 'Login failed';
        }
        this.errorMessage = err.message || 'An error occurred';
        console.error(`Error: ${this.errorMessage}`);
      },
    });
  }
}
