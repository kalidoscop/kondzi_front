import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('token')) {
      // logged in so return true
      return true;
    } else {
      return this.router.navigate(['login']);
    }
    // not logged in so redirect to login page with the return url
    // , { queryParams: { returnUrl: state.url } });
  }
}
