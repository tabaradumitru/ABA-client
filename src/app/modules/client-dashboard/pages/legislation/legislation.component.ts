import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-legislation',
  templateUrl: './legislation.component.html',
  styleUrls: ['./legislation.component.scss']
})
export class LegislationComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'LEGISLAȚIE',
    routerLink: '/legislatie'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
