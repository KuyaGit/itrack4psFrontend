import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.scss']
})
export class UpdateinfoComponent implements OnInit{
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
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private ref: MatDialogRef<UpdateinfoComponent>,
    private _dataService: DataService,
    private fb: FormBuilder,
    private _alertService: AlertServiceService,
  ){
    this.profileForm = this.fb.group({
      accountuser_id : [''],
      email : ['', [Validators.required, Validators.email]],
      fname : ['', [Validators.required]],
      lname : ['', [Validators.required]],
      mobile_number : ['', [Validators.required]],
      address : ['', [Validators.required]],
      account_type: [''],
      schoolName: [''],
      profile_piclink: [''],
    })
  }
  get form(): { [key: string]: AbstractControl } {
    // This function will return the form controls
    return this.profileForm.controls;
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
  ngOnInit(): void {
    this.inputdata = this.data
    this.subsription_get_all_user.add(
      this._dataService.get_user_profile(this.inputdata.code).subscribe((result) => {
        this.userInfo = result.result[0];
        this.fileUrl = this.userInfo.profile_piclink;
        if (typeof this.userInfo.account_type === 'number') {
          this.userInfo.account_type = Number(this.userInfo.account_type);
          this.userInfo.accountTypeName = this.getAccountType(this.userInfo.account_type);
        }
        this.profileForm.patchValue(this.userInfo);
        console.log(this.userInfo);
      })
    );
    console.log(this.userInfo);
  }
  closepopup(){
    this.ref.close();
  }



  selectedFileName!: any;



  profileInfo!: any;
  defaultProfilePhotoUrl: string = 'assets/default.png'

  hide = true;
  isInputDisabled = false;
  subscription: Subscription = new Subscription();


  secActive: boolean = false;
  passwordSuccess: boolean = false;
  infoSuccess: boolean = false;

  onPasswordSubmit() {
    if (this.profileForm.controls['password'] !== this.profileForm.controls['confirmPassword']) {
      this._alertService.simpleAlert(
        'error',
        'Password not match',
        'Password must match'
      );
      return;
    }
    this.passwordSuccess = true;
    this.profileForm.controls['password'].value;
    this.profileForm.controls['confirmPassword'].value;
  }

  onInfoSubmit() {
    this.infoSuccess = true;
    this.profileForm.controls['name'].value;
  }


  accountuser_id : number = 0;
  getProfileData() {
    const userSessString = localStorage.getItem('user_loginSession');
    if (userSessString !== null) {
      const parsed = JSON.parse(userSessString);
      this.accountuser_id = parsed.accountuser_id;
    }
    this.subscription.add(
      this._dataService.get_user_profile(this.accountuser_id).subscribe((result) => {
        console.log(result);
        this.profileInfo = result.result[0];
        console.log(this.profileInfo)
        this.fileUrl = this.profileInfo.profile_piclink;
        this.profileForm.patchValue(this.profileInfo);

      })

    );
  }

  currentFile?: File;
  progress = 0;
  message = '';

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  clearImagePreview(): void {
    this.imagePreview = null;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this._dataService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file: File = this.selectedFiles[0];

      // Check the file size
      if (file.size <= 2 * 1024 * 1024) { // 2MB or smaller
        // Check the aspect ratio
        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = () => {
          const width = image.width;
          const height = image.height;

          if (width === height) { // Square (2x2 pixels)
            this.selectedFileName = file.name;
            this.profileForm.get('profile_piclink')?.setValue(this.selectedFileName);

            // Display a preview of the selected image
            this.previewImage(file);
          } else {
            this.handleError('Image must be a square image.')

          }
        };
      } else {
        this.handleError('File size exceeds the maximum allowed size (2MB).');
      }
    }
  }

  update() {
    this._dataService.update_profile(this.profileForm.value).subscribe(
      async (result) => {
        if (result && result.status === '200') {
          this.handleSuccess('Beneficiary Profile Created');
          this.upload()
          await this.getProfileData();
        } else {
          this.handleError('Failed to Create Beneficiary profile');
        }
      },
      (error) => {
        this.handleError('An error occurred while updating profile');
        console.error(error);
      }
    );
  }
  private handleSuccess(message: any) {
    this._alertService.simpleAlert('success', 'success', message);
  }

  private handleError(message: any) {
    this._alertService.simpleAlert('error', 'Error', message);
  }
}
