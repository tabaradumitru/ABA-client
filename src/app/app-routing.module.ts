import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ClientAuthenticationComponent } from './modules/home/client-authentication/client-authentication.component';
import { EmployeeAuthenticationComponent } from './modules/home/employee-authentication/employee-authentication.component';
import { LoggedInAuthGuard } from '@guards/logged-in-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'acasa', loadChildren: () => import('./modules/client-dashboard/client-dashboard.module')
    .then(m => m.ClientDashboardModule) },
  { path: 'admin', loadChildren: () => import('./modules/employee-dashboard/employee-dashboard.module')
    .then(m => m.EmployeeDashboardModule) },
  { path: 'autentificare', component: ClientAuthenticationComponent, pathMatch: 'full', canActivate: [LoggedInAuthGuard] },
  { path: 'autentificare/angajat', component: EmployeeAuthenticationComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
