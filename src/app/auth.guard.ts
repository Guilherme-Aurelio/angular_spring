import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {

  constructor (private login: LoginService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
      if (this.login.estaAutenticado()) {
        return true;
      } else {
        return this.router.createUrlTree(['/login']);
      }
  }
};
