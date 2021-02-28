import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-all-licenses',
  templateUrl: './all-licenses.component.html',
  styleUrls: ['./all-licenses.component.scss']
})
export class AllLicensesComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'Permise',
    routerLink: '/licenses'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
