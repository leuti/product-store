// external modules
import { Component, OnInit } from '@angular/core';
// internal services & models
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  login: string = '';
  password: string = '';

  constructor() {}

  ngOnInit(): void {}

  loginUser() {}
}
