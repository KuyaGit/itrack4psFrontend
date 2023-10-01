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
        pk:[''],
        username: ['', [Validators.required]],
        fName : ['', [Validators.required]],
        accountType: ['', [Validators.required]],
      });
  }

  ngOnInit() {

  }
  openDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef,{
      width: '80%',
      // height: '55%',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.createaccountForm.controls;
  }
}
