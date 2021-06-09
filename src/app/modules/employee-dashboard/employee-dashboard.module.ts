import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { AllLicensesComponent } from './pages/all-licenses/all-licenses.component';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { LicenseComponent } from './pages/license/license.component';
import { RequestComponent } from './pages/request/request.component';
import { EmployeeDashboardRoutingModule } from '@employee-dashboard/employee-dashboard-routing.module';
import { PrimeModule } from '@shared-packages/prime/prime.module';
import { BreadcrumbModule } from '@shared-components/breadcrumb/breadcrumb.module';
import { RequestPreviewDialogComponent } from './pages/request-preview-dialog/request-preview-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EmployeeHomeComponent } from './pages/employee-home/employee-home.component';


@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    AllLicensesComponent,
    AllRequestsComponent,
    LicenseComponent,
    RequestComponent,
    RequestPreviewDialogComponent,
    EmployeeHomeComponent ],
	imports: [
		CommonModule,
		EmployeeDashboardRoutingModule,
		PrimeModule,
		BreadcrumbModule,
		SharedModule,
		FormsModule
	]
})
export class EmployeeDashboardModule {
}
