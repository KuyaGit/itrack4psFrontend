import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeneficiaryFormComponent } from './pages/beneficiary-form/beneficiary-form.component';

import { ProfileSettingComponent } from './pages/profile-setting/profile-setting.component';
import { UsermanagementComponent } from './pages/usermanagement/usermanagement.component';
import { HouseholdbeneficiaryComponent } from './pages/householdbeneficiary/householdbeneficiary.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { SchoolregistrarComponent } from './pages/schoolregistrar/schoolregistrar.component';
import { SchoolaccountsComponent } from './pages/schoolaccounts/schoolaccounts.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent
      },
      {
        path: 'beneficiary',
        title: 'Beneficiary',
        component: BeneficiaryFormComponent
      },
      {
        path: 'profilesetting',
        title: 'Profile Setting',
        component: ProfileSettingComponent
      },
      {
        path: 'usermanagement',
        title: 'User Management',
        component: UsermanagementComponent
      },
      {
        path: 'householdbeneficiary',
        title: 'Household Beneficiary',
        component: HouseholdbeneficiaryComponent
      },
      {
        path: 'studentbeneficiary',
        title: 'Student Beneficiary',
        component: SchoolregistrarComponent
      },
      {
        path: 'schoolaccounts',
        title: 'School Registrar Account Management',
        component: SchoolaccountsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

