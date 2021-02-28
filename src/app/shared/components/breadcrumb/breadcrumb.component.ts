import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() items: MenuItem[];

  home: MenuItem = {
    label: '',
    icon: 'pi pi-home',
    routerLink: '/dashboard'
  };

  constructor() { }
}
