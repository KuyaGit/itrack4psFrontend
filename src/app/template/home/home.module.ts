import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
//import { ProfileSettingComponent } from './pages/profile-setting/profile-setting.component';
import { BeneficiariesFormComponent } from './pages/beneficiaries-form/beneficiaries-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    //ProfileSettingComponent,
    BeneficiariesFormComponent,
  ],
 imports: [
  CommonModule,
  IonicModule.forRoot(),
  HomeRoutingModule,
]

})
export class HomeModule { }
