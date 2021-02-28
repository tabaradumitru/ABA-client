import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  idnp: string = undefined;

  topLeftMenuItems: MenuItem[] = [{
    label: 'Acasă',
    icon: 'pi pi-home',
    routerLink: ['/'],
    routerLinkActiveOptions: { exact: true }
  }, {
    label: 'Anunturi',
    icon: 'pi pi-bell',
    routerLink: 'announcements',
    routerLinkActiveOptions: {exact: true }
  }, {
    label: 'Contacte',
    icon: 'pi pi-phone',
    routerLink: 'contacts',
    routerLinkActiveOptions: { exact: true }
  }];

  topRightMenuItems: MenuItem[] = [{
    label: '',
    icon: 'pi pi-user',
    items: [{
      label: 'Log Out',
      icon: 'pi pi-sign-out'
    }]
  }];

  leftMenuItems: MenuItem[] = [{
    label: 'Cereri',
    icon: 'pi pi-file',
    routerLink: 'requests',
    routerLinkActiveOptions: { exact: true },
    state: { idnp: this.idnp }
  }, {
    label: 'Permise',
    icon: 'pi pi-id-card',
    routerLink: 'licenses',
    routerLinkActiveOptions: { exact: true },
    state: { idnp: this.idnp }
  }, {
    label: 'Legislatie',
    icon: 'pi pi-shield',
    routerLink: 'law',
    routerLinkActiveOptions: { exact: true },
  }, {
    label: 'FAQ',
    icon: 'pi pi-question',
    routerLink: 'faq',
    routerLinkActiveOptions: { exact: true }
  }];

  constructor() { }

  ngOnInit(): void {
    // TODO: set user data
    this.topRightMenuItems[0].label = '2008024014423';
  }

}
