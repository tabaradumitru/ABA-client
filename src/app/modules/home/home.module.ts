import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ClientAuthenticationComponent } from './client-authentication/client-authentication.component';
import { EmployeeAuthenticationComponent } from './employee-authentication/employee-authentication.component';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from '@shared-packages/prime/prime.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ClientAuthenticationComponent,
    EmployeeAuthenticationComponent
  ], imports: [
		CommonModule,
		PrimeModule,
		FormsModule,
		SharedModule
	]
})
export class HomeModule {
}
