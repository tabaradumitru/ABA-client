import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'ACASĂ',
    routerLink: '/acasa'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
