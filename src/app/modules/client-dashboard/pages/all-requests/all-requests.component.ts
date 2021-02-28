import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'Cereri',
    routerLink: '/requests'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
