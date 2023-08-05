import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000';
  private isLoggedIn = false;

  constructor(private http: HttpClient) { }

  registerUser(name: string, email: string, password: string): Observable<any> {
    const userData = { name, email, password };
    
    return this.http.post<any>(`${this.url}/users/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    const userData = { email, password };
    return this.http.post<any>(`${this.url}/users/login`, userData);
  }

  isAuthenticated(){
    return this.isLoggedIn;
  }
}
