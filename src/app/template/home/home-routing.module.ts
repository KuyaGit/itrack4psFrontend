import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeneficiaryFormComponent } from './pages/beneficiary-form/beneficiary-form.component';
import { SchoolregistrarComponent } from './pages/schoolregistrar/schoolregistrar.component';

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
    }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

