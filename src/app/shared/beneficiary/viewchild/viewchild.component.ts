import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AlertServiceService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-viewchild',
  templateUrl: './viewchild.component.html',
  styleUrls: ['./viewchild.component.scss']
})
export class ViewchildComponent {
  id: any = localStorage.getItem('user_loginSession')
  account_type = (JSON.parse(this.id)).account_type;
  userInfo: any;
  inputdata : any;
  custdata: any;
  fileUrl: string = '';
  selectedFiles?: FileList;
  imagePreview: string | ArrayBuffer | null = null;
  profileForm: FormGroup;
  private subsription_get_all_user: Subscription = new Subscription();
  statusValue: any

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private ref: MatDialogRef<ViewchildComponent>,
    private _dataService: DataService,
    private fb: FormBuilder,
    private _alertService: AlertServiceService
  ){
    this.profileForm = this.fb.group({
      child_id: [''],
      accountsdetails_id : [''],
      schoolname: [''],
      fname: [''],
      lname: [''],
      birthdate: [''],
      snhcourse: [''],
      collegecourse: [''],
      profile_piclink: [''],
      collegeschoolname: [''],
      collegeaddress: [''],
      status: [''],
      elemschool: [''],
      elemaddress: [''],
      junschool: [''],
      junaddress: [''],
      shschoolname: [''],
      shschooladdress: [''],
      tesdacourse: [''],
      work: ['']
    });
  }
  closepopup(){
    this.ref.close();
  }
  childId: any
  beneStatus: any
  ngOnInit() {
    this.inputdata = this.data
    this.subsription_get_all_user.add(
      this._dataService.get_child_profile(this.inputdata.code).subscribe((result) => {
        this.userInfo = result.result[0];
        this.fileUrl = this.userInfo.profile_piclink;
        this.statusValue = this.userInfo.status;
        this.childId = this.userInfo.child_id;
        this.beneStatus = this.userInfo.beneficiary_status;
        console.log(this.userInfo)
        if (typeof this.userInfo.status === 'number') {
          console.log(this.userInfo.status)
          this.userInfo.status = Number(this.userInfo.status);
          this.userInfo.status = this.getStatusType(this.userInfo.status);
        }
        this.profileForm.patchValue(this.userInfo);

      })
    );
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
  deletechild(accountuser_id: string) {
    this._alertService.simpleAlert(
      'warning',
      'Warning',
      'Are you sure you want to delete this user?',
      () => {
        this._dataService.deleteuserprofile(accountuser_id).subscribe(
          (result) => {
            if (result && result.status === '200') {
              this.handleSuccess('User profile deleted successfully');
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

  approved(child_id: number, beneficiary_status: number) {
    this._alertService.simpleAlert(
      'warning',
      'Warning',
      'Are you sure you want to approved this student?',
      () => {
        this._dataService.update_beneficiary_status(child_id, beneficiary_status).subscribe(
          (result) => {
            if (result && result.status === '200') {
              this.handleSuccess('Student Beneficiary Approved');
              this.closepopup()
            } else {
              this.handleError('Failed to Approved Student');
            }
          },
          (error) => {
            this.handleError(
              'An error occurred while approving the student profile'
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
  declined(child_id: number, beneficiary_status: number) {
    this._alertService.simpleAlert(
      'warning',
      'Warning',
      'Are you sure you want to decline this student?',
      () => {
        this._dataService.update_beneficiary_status(child_id, beneficiary_status).subscribe(
          (result) => {
            if (result && result.status === '200') {
              this.handleSuccess('Student Beneficiary Declined');
              this.closepopup()
            } else {
              this.handleError('Failed to Decline Student');
            }
          },
          (error) => {
            this.handleError(
              'An error occurred while declining the student profile'
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
