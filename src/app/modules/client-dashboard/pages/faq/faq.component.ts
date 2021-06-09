import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  items: MenuItem[] = [{
    label: 'ÎNTREBĂRI FRECVENTE',
    routerLink: '/intrebari-frecvente'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
