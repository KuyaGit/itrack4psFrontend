import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { accountdetails, getalluser, schoolname } from 'src/app/services/data';
import { AddUserService } from 'src/app/services/add-user.service';
import { SchedulerAction, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SchoolService } from 'src/app/services/school.service';
import { accountuser } from 'src/app/services/data';
import { RegisterService } from 'src/app/services/register.service';
import { InformationComponent } from 'src/app/shared/information/information.component';
import { UpdateinfoComponent } from 'src/app/shared/updateinfo/updateinfo.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})

export class UsermanagementComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  schoolnames: schoolname [] = []
  hide = true;
  createaccountForm: FormGroup;
  createbeneForm: FormGroup;
  id: any = localStorage.getItem('user_loginSession')
  account_type = (JSON.parse(this.id)).account_type;

  displayedColumns: string[] = [
    'accountsdetails_id',
    'name',
    'mobile_number',
    'address',
    'account_type',
    'action',
  ];
  fileUrl = 'assets/default-profile-photo.png';
  imgUrl!: string;
  alluserData = new MatTableDataSource<getalluser>([]);
  constructor(
    private _alertService: AlertServiceService,
    public _addUserService: AddUserService,
    public _registerService: RegisterService,
    public dialog: MatDialog,
    public formbuilder: FormBuilder,
    private _dataService: DataService,
    private _schoolname: SchoolService,
    )
    {
      this.createaccountForm = this.formbuilder.group({
        fName : ['', [Validators.required]],
        lName : ['', [Validators.required]],
        account_type: ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        schoolName : [null, [Validators.required]],
        profile_piclink: 'https://itrack4ps.s3.ap-southeast-2.amazonaws.com/default.png'
      });
      this.createbeneForm = this.formbuilder.group({
        fName : ['', Validators.required],
        lName : ['', Validators.required],
        householdNumber: ['', Validators.required],
        email : ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', Validators.required],
        profile_piclink: 'https://itrack4ps.s3.ap-southeast-2.amazonaws.com/default.png',
        account_type: 3,
      })
      this.createaccountForm.controls['account_type'].valueChanges
        .subscribe(value => this.schoolnamerequired(value));
  }

  viewItem(accountuser_id: any) {
        this.viewItemDialog(accountuser_id, 'User Information', InformationComponent);
  }

  updateItem(accountuser_id: any) {
    this.viewItemDialog(accountuser_id, 'Edit Information', UpdateinfoComponent);
  }


  viewItemDialog(accountuser_id: number, title: string, component: any) {
    var _popup = this.dialog.open(component, {
      width: '80%',
      data: {
        title: title,
        code: accountuser_id
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getallUser();
    })
  }


  accountTypeText : string = ''

  accountTypeName : any [] = [
    { value : 1 ,
      text : 'Admin'
    },
    {
      value : 2,
      text : '4ps Staff'
    },
    {
      value : 3,
      text : 'Beneficiary'
    },
    {
      value : 4,
      text: 'School Registrar'
    }
  ];

  getAccountType(account_type: number): string {
    const status = this.accountTypeName.find(
      (option) => option.value === account_type
    );
    return status ? status.text : '';
  }


  private subsription_get_all_user: Subscription = new Subscription();

  alluserList!: getalluser[];
  getallUser() {
    this.subsription_get_all_user.add(
      this._dataService.get_all_user().subscribe(
        (result) => {
          console.log(result);
          if (Array.isArray(result.result)) {
            this.alluserList = result.result;
            this.alluserList.forEach((user)=>{
              user.account_type = Number(user.account_type);
              user.accountTypeName = this.getAccountType(user.account_type);
            })
            console.log(this.alluserList);
            if (this.paginator && this.sort) {
              this.alluserData = new MatTableDataSource(this.alluserList);
              this.alluserData.paginator = this.paginator;
              this.alluserData.sort = this.sort;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alluserData.filter = filterValue.trim().toLowerCase();
}

  ngOnInit() {
    this.getallUser();
    this.schoolnames = this._schoolname.getSchoolNames()
  }
  openDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef,{
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createaccountForm.reset();
    });
  }

  get form(): { [key: string]: AbstractControl } {
    // This function will return the form controls
    return this.createaccountForm.controls ;
  }

  get createform(): { [key: string]: AbstractControl } {
    return this.createbeneForm.controls ;
  }


  // Make Form School Name required when account type 4 is selected
  schoolnamerequired(value: string) {
    // This function will change the validators for the schoolName field
    const account_type = this.createaccountForm.get('account_type');
    const schoolName = this.createaccountForm.get('schoolName');
    if ( account_type?.value == '4') {
      schoolName?.setValidators(Validators.required);
    } else {
      schoolName?.clearValidators();
    }
    schoolName?.updateValueAndValidity();
  }

  adduserSubscription() {
        const formData: accountdetails  = this.createaccountForm.value;
        this._addUserService.adduser(formData).subscribe(
          (response) => {
            console.log('reg success', response);
            this._alertService.simpleAlert(
              'success',
              'Success',
              'Registration successful',
              () => {

              }
            );
            this.createaccountForm.reset();
            this.getallUser();
          },
          (error) => {
            console.log('error', error);
            if (error.status === 401) {
              this._alertService.simpleAlert(
                'error',
                'Error',
                'You already have an account.'
              );
            } else if (error.status === 400) {
              this._alertService.simpleAlert(
                'error',
                'Error',
                'Email already exists.'
              );
            } else {
              this._alertService.simpleAlert(
                'error',
                'Error',
                "Household number doesn't exists on our Database you can't register."
          );
        }
      }
    );
  }
  registerSubscription() {
    console.log(this.createbeneForm.value)

    this._registerService.register(this.createbeneForm.value).subscribe(
      (response) => {
        console.log('reg success', response.message);
        this._alertService.simpleAlert(
          'success',
          'Success',
          response.message,
          () => {
          }
        );
        this.getallUser()
        this.createbeneForm.reset();
      },
      (error) => {
        console.log('error', error);
        if (error.status === 401) {
          this._alertService.simpleAlert(
            'error',
            'Error',
            'You already have an account.'
          );
          this.createbeneForm.reset();
        } else if (error.status === 400) {
          this._alertService.simpleAlert(
            'error',
            'Error',
            'Email already exists.'
          );
          this.createbeneForm.reset();
        } else {
          this._alertService.simpleAlert(
            'error',
            'Error',
            "Household number doesn't exists on our Database you can't register."
          );
          this.createbeneForm.reset();
        }
      }
    );
  }
  deleteuser(accountuser_id: string) {
    this._alertService.simpleAlert(
      'warning',
      'Warning',
      'Are you sure you want to delete this user?',
      () => {
        this._dataService.deleteuserprofile(accountuser_id).subscribe(
          (result) => {
            if (result && result.status === '200') {
              this.handleSuccess('User profile deleted successfully');

              this.getallUser();
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
      () => {
        //cancel
        console.log('Action canceled.');
      }
    );
  }
  private handleError(message: string) {
    this._alertService.simpleAlert('error', 'Error', message);
  }
  private handleSuccess(message: string) {
    this._alertService.simpleAlert('success', 'Success', message);
  }
}




