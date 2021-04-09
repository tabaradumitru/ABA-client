import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@shared-components/spinner/spinner.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  exports: [
    SpinnerModule
  ]
})
export class SharedModule { }
