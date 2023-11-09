import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { MatDialog, } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildbeneficiaryComponent } from 'src/app/shared/childbeneficiary/childbeneficiary.component';
import { Subscription } from 'rxjs'
import { DataService } from 'src/app/services/data.service';
import { ViewchildComponent } from 'src/app/shared/beneficiary/viewchild/viewchild.component';

@Component({
  selector: 'app-householdbeneficiary',
  templateUrl: './householdbeneficiary.component.html',
  styleUrls: ['./householdbeneficiary.component.scss']
})
export class HouseholdbeneficiaryComponent implements OnInit {
  hide = true;
  id: any = localStorage.getItem('user_loginSession')
  accountuser_id = (JSON.parse(this.id)).accountuser_id;
  childbeneficiaryForm: FormGroup;
    constructor(
      private alertService: AlertServiceService,
      public dialog: MatDialog,
      public formbuilder: FormBuilder,
      private _dataService: DataService,
      private _alertService: AlertServiceService
    ) {
      this.childbeneficiaryForm = this.formbuilder.group({
        fName : ['', [Validators.required]],
        sName : ['', [Validators.required]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        schoolName : ['', [Validators.required]],
      })
    }
  get form(): { [key: string]: AbstractControl } {
    return this.childbeneficiaryForm.controls;
  }
  ngOnInit() {
    this.getChildsData()
  }

  addchildBeneficiary() {
    this.openDialog(ChildbeneficiaryComponent)
    this.getChildsData()
  }

  openDialog(component: any) {
    let dialogRef = this.dialog.open(component,{
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.childbeneficiaryForm.reset();
      this.getChildsData()
    });
  }
  dataInfo!: any;
  subscription: Subscription = new Subscription();
  user!: any;
  getChildsData() {
    this.subscription.add(
      this._dataService.getbeneficiary(this.accountuser_id).subscribe(
        (result) => {
            this.dataInfo = result.results.data;
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }
  viewItem(child_id: any) {
    console.log(child_id);
    this.viewItemDialog(child_id, 'View Information', ViewchildComponent);
    this.getChildsData()
  }

  viewItemDialog(child_id: number, title: string, component: any) {
    var _popup = this.dialog.open(component, {
      width: '80%',
      data: {
        title: title,
        code: child_id
      }
      
    });
    _popup.afterClosed().subscribe(item => {
      this.getChildsData();
    })
  }
  statusText : string = ''

  statusName : any [] = [
    {
      value: 1,
      status: 'Elementary Student'
    },
    {
      value: 2,
      status: 'Elementary Graduate continue studying Junior High School'
    },
    {
      value: 3,
      status: 'Junior High School Graduate continue studying Senior High School'
    },
    {
      value: 4,
      status: 'Senior High School Graduate'
    },
    {
      value: 5,
      status: 'Senior High School Graduate continue studying College'
    },
    {
      value: 6,
      status: 'Senior High School Graduate continue studying TESDA'
    },
    {
      value: 7,
      status: 'Junior High School Graduate continue studying TESDA'
    },
    {
      value: 8,
      status: 'Senior High School Graduate Working Now'
    },
    {
      value: 9,
      status: 'College Graduate'
    },
    {
      value: 10,
      status: 'College Graduate and Working Now'
    },
    {
      value: 11,
      status: 'TESDA Graduate'
    },
    {
      value: 12,
      status: 'Junior High School Graduate Working Now'
    }
  ];
  getStatusType(status: number): string {
    const name = this.statusName.find(
      (option) => option.value === status
    );
    return name ? name.status : '';
  }
  deletechild(child_id: string) {
    this._alertService.simpleAlert(
      'warning',
      'Warning',
      'Are you sure you want to delete this user?',
      () => {
        this._dataService.deletechildprofile(child_id).subscribe(
          (result) => {
            if (result && result.status === '200') {
              this.handleSuccess('User profile deleted successfully');
              this.getChildsData();
            } else {
              this.handleError('Failed to delete user profile');
            }
          },
          (error) => {
            this.handleError(
              'An error occurred while deleting the user profile'
            );
            console.error(error);
          }
        );
      },

    );
  }
  
  private handleError(message: string) {
    this._alertService.simpleAlert('error', 'Error', message);
  }
  private handleSuccess(message: string) {
    this._alertService.simpleAlert('success', 'Success', message);
  }
}
