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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register(
    login: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    token: string
  ): void {
    const user = {
      login: login,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      token: token,
    };

    // register user
    this.userService.register(user).subscribe((res) => {
      this.user = res; // set user to res

      this.userService.storeUser(this.user);
      this.router.navigate(['cart']); // navigate to cart
    });
  }
}
