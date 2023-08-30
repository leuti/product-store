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
  user: User = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  loginUser(login: string, password: string): void {
    this.user.login = login;
    this.user.password = password;

    // authenticate user
    this.userService.authenticate(this.user).subscribe((res) => {
      this.user = res; // set user to res
      this.userService.storeUser(this.user); // set user data in localStore
      console.log(`User authenticated: ${JSON.stringify(this.user)}`);
      this.router.navigate(['cart']); // navigate to cart
    });
  }
}
