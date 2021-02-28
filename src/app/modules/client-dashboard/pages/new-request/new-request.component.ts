import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Request } from '../../../../core/models/request/request';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  activities: SelectItem[] = [
    { label: 'Odihnă', value: 1 },
    { label: 'Vânătoare', value: 2 },
    { label: 'Pescuit', value: 3 },
  ];

  receivingMethods: SelectItem[] = [
    { label: 'Poșta electronică', value: 1 },
    { label: 'SMS', value: 2 }
  ];

  items: MenuItem[] = [{
    label: 'Cerere nouă',
    routerLink: 'requests/new'
  }];

  request = {} as Request;

  constructor() { }

  ngOnInit(): void {
  }

}
