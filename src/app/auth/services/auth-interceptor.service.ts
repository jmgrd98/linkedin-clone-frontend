import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    return next.handle;

    // @ts-ignore
  /*  return from(
      Storage.get({
        key: 'token',
      })
    )*//*.pipe(
      switchMap((data: { value: string }) => {
   /!*     const token = data?.value;
        if (token) {
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
          });
          return next.handle(clonedRequest);
        }
        return next.handle(req);*!/
      })
    );*/
  }

  constructor() { }
}
