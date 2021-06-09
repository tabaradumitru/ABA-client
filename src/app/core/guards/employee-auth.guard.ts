import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
  export class EmployeeAuthGuard implements CanActivate, CanActivateChild {

  private jwtService = new JwtHelperService();

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const currentUser = this.authenticationService.currentUserValue;

      if (currentUser) {
        if (route?.data?.roles?.indexOf(currentUser.role) === -1 || this.jwtService.isTokenExpired(currentUser.token)) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }

      this.router.navigate(['/autentificare']);
      return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(childRoute, state);
    }
  }
