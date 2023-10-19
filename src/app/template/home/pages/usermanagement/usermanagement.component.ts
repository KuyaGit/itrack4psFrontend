import { Component, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { accoundetails } from 'src/app/services/data';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})

export class UsermanagementComponent implements OnInit{
  hide = true;
  createaccountForm: FormGroup;
  constructor(
    private _alertService: AlertServiceService,
    public _addUserService: AddUserService,
    public dialog: MatDialog,
    public formbuilder: FormBuilder
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
      this.createaccountForm.controls['account_type'].valueChanges
        .subscribe(value => this.householdnumberrequired(value));
  }

  ngOnInit() {
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

  createAccount() {
    console.log(this.createaccountForm.value);
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
    householdnumberrequired(value: string) {
      // This function will change the validators for the schoolName field
      const account_type = this.createaccountForm.get('account_type');
      const householdNumber = this.createaccountForm.get('householdnumber');
      if ( account_type?.value == '4') {
        householdNumber?.setValidators(Validators.required);
      } else {
        householdNumber?.clearValidators();
      }
      householdNumber?.updateValueAndValidity();
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




