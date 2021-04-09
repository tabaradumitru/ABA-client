import { Component, OnInit } from '@angular/core';
import { TwoStepAuthModel } from '@models/auth/two-step-auth-model';
import { AuthenticationService } from '@services/authentication.service';
import { LocalStorageService } from '@services/local-storage.service';
import { Router } from '@angular/router';
import { ConfigurationService } from '@services/configuration.service';
import { NotificationService } from '@services/notification.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-client-authentication',
  templateUrl: './client-authentication.component.html',
  styleUrls: ['./client-authentication.component.scss']
})
export class ClientAuthenticationComponent implements OnInit {

  mobileSignature: string;

  twoStepAuthModel: TwoStepAuthModel = {} as TwoStepAuthModel;

  constructor(private authService: AuthenticationService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private configurationService: ConfigurationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  twoStepAuthLogin(): void {
    this.authService.twoStepAuthLogin(this.twoStepAuthModel)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['acasa']);
      }, error => {
        this.notificationService.callError('Eroare', error.toString());
      });
  }
}
