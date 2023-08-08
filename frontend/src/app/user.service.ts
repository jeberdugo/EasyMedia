import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000';
  private isLoggedIn = false;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  registerUser(name: string, email: string, password: string): Observable<any> {
    const userData = { name, email, password };
    
    return this.http.post<any>(`${this.url}/users/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    const userData = { email, password };
    return this.http.post<any>(`${this.url}/users/login`, userData);
  }

  public decodeToken(): any {
    const token = localStorage.getItem('token');
    if(!token) return null;
    return this.jwtHelper.decodeToken(token);
  }

  public getClaim(claimKey: string): any {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken[claimKey] : null;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
