import { Component, OnInit } from '@angular/core';
import { TwoStepAuthModel } from '@models/auth/two-step-auth-model';
import { AuthenticationService } from '@services/authentication.service';
import { LocalStorageService } from '@services/local-storage.service';
import { Router } from '@angular/router';
import { ConfigurationService } from '@services/configuration.service';
import { NotificationService } from '@services/notification.service';
import { first } from 'rxjs/operators';
import { CLIENT_AUTHENTICATION } from '@constants/loading-constants';

@Component({
  selector: 'app-client-authentication',
  templateUrl: './client-authentication.component.html',
  styleUrls: ['./client-authentication.component.scss']
})
export class ClientAuthenticationComponent implements OnInit {

  loadingConstant = CLIENT_AUTHENTICATION;
  mobileSignature: string;

  twoStepAuthModel: TwoStepAuthModel = {} as TwoStepAuthModel;

  constructor(private authService: AuthenticationService,
              private localStorageService: LocalStorageService,
              private router: Router,
              public configurationService: ConfigurationService,
              private notificationService: NotificationService) {
    this.configurationService.setLoading(true, this.loadingConstant);
  }

  ngOnInit(): void {
    setTimeout(() => this.configurationService.setLoading(false, this.loadingConstant), 1000);
  }

  twoStepAuthLogin(): void {
    this.configurationService.setLoading(true, this.loadingConstant);
    this.twoStepAuthModel.idnp = this.twoStepAuthModel.idnp.toString();
    this.authService.twoStepAuthLogin(this.twoStepAuthModel)
      .pipe(first())
      .subscribe(() => {
        this.notificationService.callSuccess('Succes', 'Ați fost autentificat cu succes!');
        this.configurationService.setLoading(false, this.loadingConstant);
        this.router.navigate(['acasa']);
      }, error => {
        this.notificationService.callError('Eroare', error.toString());
        this.configurationService.setLoading(false, this.loadingConstant);
      });
  }
}
