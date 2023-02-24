import { Injectable } from '@angular/core';
import {NewUser} from "../models/newUser";
import {BehaviorSubject, from, map, Observable, of, pipe, switchMap, take, tap} from "rxjs";
import {Role, User} from "../models/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {UserResponse} from "../models/UserResponse";
import jwt_decode from 'jwt-decode';
import {AuthPage} from "../auth.page";

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
    private router: Router,
  ) { }

  register(newUser: NewUser): Observable<User> {
    // this.router.navigateByUrl('/home');
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
      }));
  }

  isTokenInStorage(): Observable<boolean> {
    // @ts-ignore
    return from(localStorage.getItem('token'))
      .pipe(
        map((data: {value: string}) => {
          if(!data || !data.value) return null;
          const decodedToken: UserResponse = jwt_decode(data.value);
          const jwtExpiration = decodedToken.exp * 1000;
          const isExpired = new Date() > new Date(jwtExpiration);
          if(isExpired) return null;
          if(decodedToken.user) {
            this.user$.next(decodedToken.user);
            return true;
          }
          return null;
        })
      )
  }

  logout(): void {
    // @ts-ignore
    this.user$.next(null);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }
}
