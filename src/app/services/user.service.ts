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
  constructor(private http: HttpClient) {}

  // send user to API and register
  register(user: User): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log(`Registring user ${JSON.stringify(user)}`);
    return this.http.post('http://localhost:3000/users', user, { headers });
  }
}
