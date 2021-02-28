import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { PrimeModule } from '../../packages/prime/prime.module';


@NgModule({
  declarations: [ BreadcrumbComponent ],
  imports: [
    CommonModule,
    PrimeModule
  ],
  exports: [
    BreadcrumbComponent
  ]
})
export class BreadcrumbModule {
}
