import { Injectable } from '@angular/core';
import {NewUser} from "../models/newUser";
import {Observable, take, tap} from "rxjs";
import {User} from "../models/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Plugins} from "@capacitor/core";
import {UserResponse} from "../models/UserResponse";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(newUser: NewUser): Observable<User> {
    return this.http.post<User>(
      `${environment.baseApiUrl}/auth/register`, newUser, this.httpOptions
    ).pipe(take(1));
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }> (
      `${environment.baseApiUrl}/auth/login`, {email, password }, this.httpOptions
    ).pipe(take(1),
      tap((response: { token: string }) => {
        localStorage.setItem('token', response.token);
        const decodedToken: UserResponse = jwt_decode(response.token);
      }));
  }
}
