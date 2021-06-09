import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SpinnerModule} from 'primeng/spinner';
import {RippleModule} from 'primeng/ripple';
import {CalendarModule} from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { BadgeModule } from 'primeng/badge';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';

const exports = [
  ToastModule,
  ButtonModule,
  InputTextModule,
  TableModule,
  CheckboxModule,
  InputTextareaModule,
  RadioButtonModule,
  SpinnerModule,
  RippleModule,
  CalendarModule,
  MenuModule,
  MenubarModule,
  BreadcrumbModule,
  CardModule,
  DropdownModule,
  DividerModule,
  InputMaskModule,
  MultiSelectModule,
  BadgeModule,
  DynamicDialogModule,
  TooltipModule,
  InputNumberModule,
  AccordionModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...exports
  ],
  exports
})
export class PrimeModule { }
