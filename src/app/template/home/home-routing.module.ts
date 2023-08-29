import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeneficiaryFormComponent } from './pages/beneficiary-form/beneficiary-form.component';
import { SchoolregistrarComponent } from './pages/schoolregistrar/schoolregistrar.component';
import { ProfileSettingComponent } from './pages/profile-setting/profile-setting.component';
import { UsermanagementComponent } from './pages/usermanagement/usermanagement.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'beneficiary',
      component: BeneficiaryFormComponent
    },
    {
      path: 'school',
      component: SchoolregistrarComponent
    },
    {
      path: 'profilesetting',
      component: ProfileSettingComponent
    },
    {
      path: 'usermanagement',
      component: UsermanagementComponent
    }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

