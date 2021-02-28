import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RequestComponent } from './pages/request/request.component';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { AllLicensesComponent } from './pages/all-licenses/all-licenses.component';
import { LicenseComponent } from './pages/license/license.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'requests', component: AllRequestsComponent},
      { path: 'requests/new', component: NewRequestComponent },
      { path: 'requests/:requestId', component: RequestComponent },
      { path: 'licenses', component: AllLicensesComponent },
      { path: 'licenses/:licenseId', component: LicenseComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ClientDashboardRoutingModule { }
