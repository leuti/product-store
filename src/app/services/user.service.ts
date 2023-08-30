// external modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// internal services & models
import { User } from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userLoggedIn: boolean = false;
  fullname: string = '';

  constructor(private http: HttpClient) {}

  // send user to API and register
  register(user: User): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log(`Registring user ${JSON.stringify(user)}`);
    return this.http.post('http://localhost:3000/users', user, { headers });
  }

  storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user)); // store token in localStorage
    this.userLoggedIn = true; // Inform user service that user is loggedIn
    console.log(`user: ${JSON.stringify(user)}`);
    this.fullname = user.firstName + user.lastName;
  }

  authenticate() {}

  setUserLoggedIn(): void {
    this.userLoggedIn = true;
  }

  getUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  setUserData(firstname: string, lastname: string): void {
    this.fullname = firstname + ' ' + lastname;
    console.log(`Setting User data: ${this.fullname}`);
  }

  getUserData(): string {
    return this.fullname;
  }
}
