import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '@services/authentication.service';
import { HOME } from '@constants/loading-constants';
import { ConfigurationService } from '@services/configuration.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loadingConstant = HOME;
  topMenu: MenuItem[] = [];
  rightMenu: MenuItem[] = [];
  loggedInUserMenu: MenuItem[] = [];
  userIsLoggedIn = false;

  constructor(private authenticationService: AuthenticationService,
              public configurationService: ConfigurationService,
              private notificationService: NotificationService) {
    this.configurationService.setLoading(true, this.loadingConstant);
    this.userIsLoggedIn = this.authenticationService.currentUserValue !== null;

    const fullName = this.authenticationService.currentUserValue
      ? `${this.authenticationService.currentUserValue.firstName} ${this.authenticationService.currentUserValue.lastName}`
      : '';

    this.topMenu = [
      { label: 'Despre noi' },
      { label: 'Legislație' },
      { label: 'Traversarea frontierei' },
      { label: 'Media' },
      { label: 'Carieră' },
      { label: 'Informație publică' }
    ];

    this.loggedInUserMenu = [{
      label: fullName,
      visible: this.userIsLoggedIn,
      items: [{
        label: 'Profilul meu',
        routerLink: '/acasa'
      }, {
        label: 'Deconectează-mă',
        command: () => this.logOut()
      }]
    }];

    this.rightMenu = [{
      label: 'Autentificare',
      routerLink: '/autentificare',
    }];
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.configurationService.setLoading(true, this.loadingConstant);
    this.authenticationService.logOut();
    this.userIsLoggedIn = false;
    setTimeout(() => {
      this.notificationService.callSuccess('Succes', 'Ați fost deconectat cu succes!');
      this.configurationService.setLoading(false, this.loadingConstant);
    }, 500);
  }

  onImageLoad(): void {
    setTimeout(() => this.configurationService.setLoading(false, this.loadingConstant), 500);
  }
}
