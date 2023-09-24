import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeneficiaryFormComponent } from './pages/beneficiary-form/beneficiary-form.component';
import { HouseholdbeneficiaryComponent } from './pages/householdbeneficiary/householdbeneficiary.component';
import { UsermanagementComponent } from './pages/usermanagement/usermanagement.component';

// Angular Material Imports
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';


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
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule


  ]
})
export class HomeModule {

}
