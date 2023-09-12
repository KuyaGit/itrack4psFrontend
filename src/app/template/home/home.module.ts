import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeneficiaryFormComponent } from './pages/beneficiary-form/beneficiary-form.component';
import { HouseholdbeneficiaryComponent } from './pages/householdbeneficiary/householdbeneficiary.component';
import { UsermanagementComponent } from './pages/usermanagement/usermanagement.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    HomeComponent,
    BeneficiaryFormComponent,
    DashboardComponent,
    HouseholdbeneficiaryComponent,
    UsermanagementComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule


  ]
})
export class HomeModule {

}
