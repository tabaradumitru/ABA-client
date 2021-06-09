import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { delay } from 'rxjs/operators';

@Injectable()
  export class JwtInterceptor implements HttpInterceptor {

  private jwtService = new JwtHelperService();

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const currentUser = this.authenticationService.currentUserValue;
      const isLoggedIn = currentUser && currentUser.token && !this.jwtService.isTokenExpired(currentUser.token);
      if (isLoggedIn) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      } else {
        this.redirectToLoginPage();
      }

      return next.handle(request).pipe(delay(300));
    }

    private redirectToLoginPage(): void {
      const whiteListRoutes = [
        '/autentificare',
        '/autentificare/angajat'
      ];

      if (!whiteListRoutes.includes(location.pathname)) this.router.navigate(['']);
    }
  }
