import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'CONTACTE',
    routerLink: '/contacte'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
