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
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule} from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProfileSettingComponent } from './pages/profile-setting/profile-setting.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InformationComponent } from 'src/app/shared/information/information.component';
import { UpdateinfoComponent } from 'src/app/shared/updateinfo/updateinfo.component';
import { BeneficiaryregComponent } from 'src/app/shared/beneficiaryreg/beneficiaryreg.component';
import { MatSortModule } from '@angular/material/sort';
import { ChildbeneficiaryComponent } from 'src/app/shared/childbeneficiary/childbeneficiary.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ViewchildComponent } from 'src/app/shared/beneficiary/viewchild/viewchild.component';
import { SchoolregistrarComponent } from './pages/schoolregistrar/schoolregistrar.component';
import { NgChartsModule } from 'ng2-charts';
import { SchoolaccountsComponent } from './pages/schoolaccounts/schoolaccounts.component';


@NgModule({
  declarations: [
    HomeComponent,
    BeneficiaryFormComponent,
    DashboardComponent,
    HouseholdbeneficiaryComponent,
    UsermanagementComponent,
    ProfileSettingComponent,
    InformationComponent,
    UpdateinfoComponent,
    BeneficiaryregComponent,
    ChildbeneficiaryComponent,
    ViewchildComponent,
    SchoolregistrarComponent,
    SchoolaccountsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    NgChartsModule,

  ]
})
export class HomeModule {

}
