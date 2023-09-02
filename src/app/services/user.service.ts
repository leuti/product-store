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
  token: string = '';

  constructor(private http: HttpClient) {}

  // send user to API and register
  registerUser(user: User): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log(`Registring user ${JSON.stringify(user)}`);
    return this.http.post('http://localhost:3000/users', user, { headers });
  }

  // send
  loginUser(login: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(
      'http://localhost:3000/users/authenticate',
      { login, password },
      {
        headers,
      }
    );
  }

  storeToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token)); // store token in localStorage
    this.userLoggedIn = true; // Inform user service that user is loggedIn
    console.log(`1 token stored: ${JSON.stringify(token)}`);
  }

  setUserLoggedIn(state: boolean): void {
    this.userLoggedIn = state;
  }

  getUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  setUserData(token: string): void {
    console.log(`setUserData reached with ${token}`);
    const decodedToken = this.decodeJwt(token);
    const user: User = {
      id: decodedToken?.payload.id,
      login: decodedToken?.payload.login,
      firstName: decodedToken?.payload.firstName,
      lastName: decodedToken?.payload.lastName,
      password: '',
      email: '',
      token: '',
    };
    localStorage.setItem('user', JSON.stringify(user)); // store token in localStorage
    this.userLoggedIn = true; // Inform user service that user is loggedIn
    console.log(`1 token stored: ${JSON.stringify(user)}`);
  }

  //getUserData(): Observable<any> {
  getUserData(token: string): void {
    const headers = { 'Content-Type': 'application/json' };
    console.log(`2 decoded token: ${token}`);
    const decodedToken = this.decodeJwt(token);
    console.log(`4 decoded token: ${decodedToken}`);
    /*return this.http.post('http://localhost:3000/users', this.user, {
        headers,
      });*/
  }

  // decode JWT token
  decodeJwt(token: string) {
    console.log(`2 decodeJwt function --> token: ${token}`);
    let parts = token.split('.');

    console.log(`Number of parts: ${parts.length}`);
    for (let i = 0; i++; i < parts.length) {
      console.log(`part ${parts[i]}: ${JSON.stringify(parts[i])}`);
    }

    // Check if the token structure is valid
    if (parts.length !== 3) {
      return null;
    } else {
      console.log(`++++++++++++++++++++++++++++++++++++++++++++++++`);
    }
    console.log('******************Noch drin**********************');
    let header = this.base64UrlDecode(parts[0]);
    let payload = this.base64UrlDecode(parts[1]);

    console.log(`                   --> header: ${header}`);
    console.log(`                   --> payload: ${payload}`);

    return {
      header: JSON.parse(header),
      payload: JSON.parse(payload),
    };
  }

  // proposed by ChatGPT
  base64UrlDecode(input: string): string {
    // Replace URL-safe characters with regular base64 characters
    let base64 = input.replace('-', '+').replace('_', '/');

    // Add the necessary padding
    while (base64.length % 4) {
      base64 += '=';
    }

    return atob(base64);
  }
}
