import { Injectable } from '@angular/core';
import {NewUser} from "../models/newUser";
import {BehaviorSubject, Observable, of, switchMap, take, tap} from "rxjs";
import {Role, User} from "../models/User";
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

  // @ts-ignore
  private user$ = new BehaviorSubject<User>(null)
  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  get isUserLoggedIn(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        const isUserAuthenticated = user !== null;
        return of(isUserAuthenticated);
      })
    );
  }

  get userRole(): Observable<Role> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        const isUserAuthenticated = user !== null;
        return of(user.role);
      })
    );
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
        this.user$.next(decodedToken.user);
        this.router.navigateByUrl('/home');
      }));
  }
}
