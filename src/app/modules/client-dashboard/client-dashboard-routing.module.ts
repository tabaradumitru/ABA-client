import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { ClientAuthGuard } from '@guards/client-auth.guard';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { AllLicensesComponent } from './pages/all-licenses/all-licenses.component';
import { Role } from '@constants/enums';

const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    canActivate: [ ClientAuthGuard ],
    data: { roles: [Role.User] },
    children: [
      { path: 'cereri', component: AllRequestsComponent},
      { path: 'permise', component: AllLicensesComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ClientDashboardRoutingModule { }
