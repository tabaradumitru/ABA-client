import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { ClientAuthGuard } from '@guards/client-auth.guard';
import { AllRequestsComponent } from './pages/all-requests/all-requests.component';
import { AllLicensesComponent } from './pages/all-licenses/all-licenses.component';
import { Role } from '@constants/enums';
import { LegislationComponent } from '@client-dashboard/pages/legislation/legislation.component';
import { FaqComponent } from '@client-dashboard/pages/faq/faq.component';
import { ContactsComponent } from '@client-dashboard/pages/contacts/contacts.component';
import { ClientHomeComponent } from '@client-dashboard/pages/client-home/client-home.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    canActivate: [ ClientAuthGuard ],
    data: { roles: [Role.User] },
    children: [
      { path: '', component: ClientHomeComponent },
      { path: 'cereri', component: AllRequestsComponent},
      { path: 'permise', component: AllLicensesComponent },
      { path: 'legislatie', component: LegislationComponent },
      { path: 'intrebari-frecvente', component: FaqComponent },
      { path: 'contacte', component: ContactsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ClientDashboardRoutingModule { }
