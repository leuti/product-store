// external modules
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// internal services & models
import { User } from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userLoggedIn: boolean = false;
  fullname: string = '';
  token: string = '';
  private userLoggedInSubject = new BehaviorSubject<boolean>(false); // proposed by ChatGPT
  public userLoggedIn$ = this.userLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // send user to API and register
  registerUser(user: User): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post(`${environment.apiUrl}/users`, user, { headers })
      .pipe(catchError(this.handleError));
  }

  // send
  loginUser(login: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post(
        `${environment.apiUrl}/users/authenticate`,
        { login, password },
        {
          headers,
        }
      )
      .pipe(catchError(this.handleError));
  }

  logoffUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.setUserLoggedIn(false);
  }

  storeToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token)); // store token in localStorage
    this.userLoggedIn = true; // Inform user service that user is loggedIn
  }

  setUserLoggedIn(state: boolean): void {
    this.userLoggedInSubject.next(state);
  }

  getUserLoggedIn(): boolean {
    return this.userLoggedInSubject.value;
  }

  setUserData(token: string): void {
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
  }

  getUserData(): User | null {
    const userString: string | null = localStorage.getItem('user'); // user from localStorage
    if (userString && userString !== null) {
      return JSON.parse(userString);
    }
    return null; // Explicitly return null if userString is null
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      // This is a conflict error.
      return throwError(
        () => new Error('User with this login already exists.')
      );
    } else if (error.status === 401) {
      // Handle other errors
      return throwError(() => new Error('Login failed.'));
    } else {
      // Handle other errors
      return throwError(
        () => new Error('An unknown error occurred. Please try again later.')
      );
    }
  }

  // decode JWT token
  decodeJwt(token: string) {
    let parts = token.split('.');

    // Check if the token structure is valid
    if (parts.length !== 3) {
      return null;
    }
    let header = this.base64UrlDecode(parts[0]);
    let payload = this.base64UrlDecode(parts[1]);

    return {
      header: JSON.parse(header),
      payload: JSON.parse(payload),
    };
  }

  // proposed by ChatGPT
  private base64UrlDecode(input: string): string {
    // Replace URL-safe characters with regular base64 characters
    let base64 = input.replace('-', '+').replace('_', '/');

    // Add the necessary padding
    while (base64.length % 4) {
      base64 += '=';
    }

    return atob(base64);
  }
}
