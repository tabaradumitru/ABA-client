import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client-dashboard.component';
import { NewRequestDialogComponent } from './pages/new-request-dialog/new-request-dialog.component';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { AllLicensesComponent } from './pages/all-licenses/all-licenses.component';
import { LicensePreviewDialogComponent } from './pages/license-preview-dialog/license-preview-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '@shared-packages/prime/prime.module';
import { BreadcrumbModule } from '@shared-components/breadcrumb/breadcrumb.module';
import { SharedModule } from '../../shared/shared.module';
import { LegislationComponent } from './pages/legislation/legislation.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ClientHomeComponent } from './pages/client-home/client-home.component';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    NewRequestDialogComponent,
    AllRequestsComponent,
    AllLicensesComponent,
    LicensePreviewDialogComponent,
    LegislationComponent,
    FaqComponent,
    ContactsComponent,
    ClientHomeComponent
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    PrimeModule,
    BreadcrumbModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientDashboardModule {
}
