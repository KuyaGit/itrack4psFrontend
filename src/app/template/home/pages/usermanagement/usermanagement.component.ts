import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { accoundetails, getalluser } from 'src/app/services/data';
import { AddUserService } from 'src/app/services/add-user.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})

export class UsermanagementComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  hide = true;
  createaccountForm: FormGroup;
  displayedColumns: string[] = [
    'accountsdetails_id',
    'name',
    // 'householdnumber',
    'mobile_number',
    // 'profile_piclink',
    'address',
    'action',
  ];
  fileUrl = 'assets/default-profile-photo.png';
  imgUrl!: string;
  alluserData = new MatTableDataSource<getalluser>([]);
  constructor(
    private _alertService: AlertServiceService,
    public _addUserService: AddUserService,
    public dialog: MatDialog,
    public formbuilder: FormBuilder,
    private _dataService: DataService,
    )
    {
      this.createaccountForm = this.formbuilder.group({
        householdnumber : [null, [Validators.required, Validators.minLength(18)]],
        fName : ['', [Validators.required]],
        lName : ['', [Validators.required]],
        account_type: ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        schoolName : [null, [Validators.required]],

      });
      this.createaccountForm.controls['account_type'].valueChanges
        .subscribe(value => this.schoolnamerequired(value));
  }
  userInfo: any
  viewItem(accountsdetails_id: any) {
    this.subsription_get_all_user.add(
      this._dataService.get_user_profile(accountsdetails_id).subscribe((result) => {
        this.alluserList = result.result[0];
        if (this.userInfo.profile_piclink !== null){
          this.imgUrl =  this.fileUrl + this.userInfo.profile_piclink;
        } else {
          this.imgUrl = this.fileUrl+ 'default.png';
        }
        this.createaccountForm.patchValue(this.alluserList);
        // this.openModal(); show modal of your view
        console.log(this.alluserList);
      })
    );
  }
  private subsription_get_all_user: Subscription = new Subscription();
  // usersList!: getalluser[];
  // getUsers() {
  //   this.subsription_get_all_user.add(
  //     this._dataService.get_all_user().subscribe(
  //       (result) => {

  //         if (Array.isArray(result.result)) {
  //           this.usersList = result.result.filter(
  //             (item: getalluser ) => item.account_type === 1,

  //           );
  //           if (this.paginator && this.sort) {
  //             console.log(this.dataSource);
  //             this.dataSource = new MatTableDataSource(this.usersList);
  //             this.dataSource.paginator = this.paginator;
  //             this.dataSource.sort = this.sort;
  //           }
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  //   );
  // }
  alluserList!: getalluser[];
  getallUser() {
    this.subsription_get_all_user.add(
      this._dataService.get_all_user().subscribe(
        (result) => {
          if (Array.isArray(result.result)) {
            this.alluserList = result.result;
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

  ngOnInit() {
    this.getallUser();
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
    return this.createaccountForm.controls;
  }



  schoolnamerequired(value: string) {
    // This function will change the validators for the schoolName field
    const account_type = this.createaccountForm.get('account_type');
    const schoolName = this.createaccountForm.get('schoolName');
    if ( account_type?.value == '3') {
      schoolName?.setValidators(Validators.required);
    } else {
      schoolName?.clearValidators();
    }
    schoolName?.updateValueAndValidity();
    }

    adduserSubscription() {
        const formData: accoundetails  = this.createaccountForm.value;
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
  }




