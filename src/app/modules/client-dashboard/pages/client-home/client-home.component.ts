import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'ACASĂ',
    routerLink: '/acasa'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
