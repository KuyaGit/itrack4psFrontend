import { Component, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})

export class UsermanagementComponent implements OnInit{
  hide = true;
  createaccountForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public formbuilder: FormBuilder
    )
    {
      this.createaccountForm = this.formbuilder.group({
        fName : ['', [Validators.required]],
        sName : ['', [Validators.required]],
        accountType: ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        schoolName : ['', [Validators.required]],
      });
      this.createaccountForm.controls['accountType'].valueChanges
                .subscribe(value => this.schoolnamerequired(value));
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
    return this.createaccountForm.controls;
  }

  createAccount() { 
    console.log(this.createaccountForm.value);
  }

  schoolnamerequired(value: string) {
    const accountType = this.createaccountForm.get('accountType');
    const schoolName = this.createaccountForm.get('schoolName');
    if ( accountType?.value == '3') {
      schoolName?.setValidators(Validators.required);
    } else {
      schoolName?.clearValidators();
    }
    schoolName?.updateValueAndValidity();
    }
  }

