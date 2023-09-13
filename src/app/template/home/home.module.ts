import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeneficiaryFormComponent } from './pages/beneficiary-form/beneficiary-form.component';
import { HouseholdbeneficiaryComponent } from './pages/householdbeneficiary/householdbeneficiary.component';
import { UsermanagementComponent } from './pages/usermanagement/usermanagement.component';

// Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { BreakpointObserver } from '@angular/cdk/layout'


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


    // Angular Material
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule


  ]
})
export class HomeModule {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }
}
