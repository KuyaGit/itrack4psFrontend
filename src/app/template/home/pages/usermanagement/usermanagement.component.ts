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

        username: ['', [Validators.required]],
        fName : ['', [Validators.required]],
        sName : ['', [Validators.required]],
        accountType: ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        schoolName : ['', [Validators.required]],
      });
  }

  ngOnInit() {

  }
  openDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef,{
      width: '80%',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.createaccountForm.controls;
  }
}
