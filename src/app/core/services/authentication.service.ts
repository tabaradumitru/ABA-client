import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TwoStepAuthModel } from '@models/auth/two-step-auth-model';
import { LocalStorageService } from '@services/local-storage.service';
import { User } from '@models/auth/user';
import { map } from 'rxjs/operators';
import { Response } from '@models/response/response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiEndpoint = 'api/authentication';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(this.localStorageService.getCurrentUserAsObject());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public checkToken(): boolean {
    return true;
  }

  twoStepAuthLogin(loginModel: TwoStepAuthModel): Observable<Response<User>> {
    return this.http.post<Response<User>>(`${this.apiEndpoint}/login/two-step-auth`, loginModel)
      .pipe(map(response => {
        const user = response.content;
        if (user && user.token) {
          this.localStorageService.setCurrentUser(JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return response;
      }));
  }

  twoStepAuthEmployeeLogin(loginModel: TwoStepAuthModel): Observable<Response<User>> {
    return this.http.post<Response<User>>(`${this.apiEndpoint}/login/two-step-auth/employee`, loginModel)
    .pipe(map(response => {
      const user = response.content;
      if (user && user.token) {
        this.localStorageService.setCurrentUser(JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return response;
    }));
  }

  logOut(): void {
    this.localStorageService.removeCurrentUser();
    this.currentUserSubject.next(null);
  }
}
