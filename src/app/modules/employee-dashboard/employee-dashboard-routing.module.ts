import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { EmployeeAuthGuard } from '@guards/employee-auth.guard';
import { Role } from '@constants/enums';
import { AllRequestsComponent } from '@employee-dashboard/pages/all-requests/all-requests.component';
import { AllLicensesComponent } from '@employee-dashboard/pages/all-licenses/all-licenses.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
    canActivate: [ EmployeeAuthGuard ],
    data: { roles: [Role.Employee] },
    children: [
      { path: 'cereri', component: AllRequestsComponent },
      { path: 'permise', component: AllLicensesComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class EmployeeDashboardRoutingModule { }
