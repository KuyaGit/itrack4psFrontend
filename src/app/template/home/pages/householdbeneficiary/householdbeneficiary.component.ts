import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { MatDialog, } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-householdbeneficiary',
  templateUrl: './householdbeneficiary.component.html',
  styleUrls: ['./householdbeneficiary.component.scss']
})
export class HouseholdbeneficiaryComponent implements OnInit {
  hide = true;
  childbeneficiaryForm: FormGroup;
    constructor(
      private alertService: AlertServiceService,
      public dialog: MatDialog,
      public formbuilder: FormBuilder
    ) {
      this.childbeneficiaryForm = this.formbuilder.group({
        fName : ['', [Validators.required]],
        sName : ['', [Validators.required]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        schoolName : ['', [Validators.required]],
      })
    }
  get form(): { [key: string]: AbstractControl } {
    // This function will return the form controls
    return this.childbeneficiaryForm.controls;
  }
    ngOnInit(): void {

    }

  createchildBeneficiary() {
    console.log(this.childbeneficiaryForm.value);
  }

  openDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef,{
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.childbeneficiaryForm.reset();
    });
  }
}
