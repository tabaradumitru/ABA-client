import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './pages/request/request.component';
import { ClientDashboardComponent } from './client-dashboard.component';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { AllLicensesComponent } from './pages/all-licenses/all-licenses.component';
import { LicenseComponent } from './pages/license/license.component';
import { PrimeModule } from '../../shared/packages/prime/prime.module';
import { BreadcrumbModule } from '../../shared/components/breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    RequestComponent,
    NewRequestComponent,
    AllRequestsComponent,
    AllLicensesComponent,
    LicenseComponent,
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    PrimeModule,
    BreadcrumbModule,
    FormsModule
  ]
})
export class ClientDashboardModule {
}
