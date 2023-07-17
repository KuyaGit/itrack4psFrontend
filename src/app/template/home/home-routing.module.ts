import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SchoolregistrarComponent } from './pages/schoolregistrar/schoolregistrar.component';
//import { ProfileSettingComponent } from './pages/profile-setting/profile-setting.component';
import { BeneficiariesFormComponent } from './pages/beneficiaries-form/beneficiaries-form.component';
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
      path: 'school',
      component: SchoolregistrarComponent
    },
    {
      path: 'beneficiaries-form',
      component: BeneficiariesFormComponent
    },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }