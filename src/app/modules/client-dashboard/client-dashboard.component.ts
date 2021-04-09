import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  topLeftMenuItems: MenuItem[] = [{
    label: 'Acasă',
    icon: 'pi pi-home',
    routerLink: ['/acasa'],
    routerLinkActiveOptions: { exact: true }
  }, {
    label: 'Anunturi',
    icon: 'pi pi-bell',
    routerLink: 'anunturi',
    routerLinkActiveOptions: {exact: true }
  }, {
    label: 'Contacte',
    icon: 'pi pi-phone',
    routerLink: 'contacte',
    routerLinkActiveOptions: { exact: true }
  }];

  topRightMenuItems: MenuItem[] = [{
    label: '',
    icon: 'pi pi-user',
    items: [{
      label: 'Log Out',
      icon: 'pi pi-sign-out',
      command: () => this.logOut()
    }]
  }];

  leftMenuItems: MenuItem[] = [{
    label: 'Cereri',
    icon: 'pi pi-envelope',
    routerLink: 'cereri',
  }, {
    label: 'Permise',
    icon: 'pi pi-id-card',
    routerLink: 'permise',
    routerLinkActiveOptions: { exact: true }
  }, {
    label: 'Legislatie',
    icon: 'pi pi-shield',
    routerLink: 'legislatie',
    routerLinkActiveOptions: { exact: true }
  }, {
    label: 'FAQ',
    icon: 'pi pi-question',
    routerLink: 'faq',
    routerLinkActiveOptions: { exact: true }
  }];

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.topRightMenuItems[0].label = `${this.authenticationService.currentUserValue.firstName} ${this.authenticationService.currentUserValue.lastName}`;
  }

  private logOut(): void {
    this.router.navigate(['/']);
    this.authenticationService.logOut();
  }
}
