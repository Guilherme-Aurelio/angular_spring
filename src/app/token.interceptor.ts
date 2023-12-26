import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class tokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}

