import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl,FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { accountdetails, userprofile } from 'src/app/services/data';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit{
  id: any = localStorage.getItem('user_loginSession')
  account_type = (JSON.parse(this.id)).account_type;
  profileInfo!: any;
  defaultProfilePhotoUrl: string = 'assets/default.png'
  fileUrl: string = '';
  hide = true;
  isInputDisabled = false;
  subscription: Subscription = new Subscription();
  profileForm : FormGroup;
  constructor(
    private _dataService: DataService,
    private fb: FormBuilder,
    private _alertService: AlertServiceService,

  ) {
    this.profileForm = this.fb.group({
      accountuser_id : [''],
      email : ['', [Validators.required, Validators.email]],
      fname : ['', [Validators.required]],
      lname : ['', [Validators.required]],
      mobile_number : ['', [Validators.required]],
      address : ['', [Validators.required]],
      schoolname: [''],
      profile_piclink: [''],
      password :['', [Validators.required]],
      newpassword: ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]],
    })
  }
  get form(): { [key: string]: AbstractControl } {
    // This function will return the form controls
    return this.profileForm.controls;
  }
  ngOnInit(): void {
    this.getProfileData();
  }

  secActive: boolean = false;
  passwordSuccess: boolean = false;
  infoSuccess: boolean = false;

  changepassword() {
    if (this.profileForm.controls['newpassword'].value !== this.profileForm.controls['confirmPassword'].value) {
      this._alertService.simpleAlert(
        'error',
        'Password not match',
        'Password must match'
      )
    }
    else{
      console.log(this.profileForm.value)
      this._dataService.changepassword(this.profileForm.value).subscribe(
        async (result) => {

          if (result && result.status === '200') {
            this.handleSuccess('Password is updated');
            this.upload()
            await this.getProfileData();
          }

          else {
            this.handleError('Failed to update password');
          }
        },
        (error) => {
          this.handleError('Password not match on your current password');
          console.error(error);
        }
      );
    }
  }



  accountuser_id : number = 0;
  getProfileData() {
    const userSessString = localStorage.getItem('user_loginSession');
    if (userSessString !== null) {
      const parsed = JSON.parse(userSessString);
      this.accountuser_id = parsed.accountuser_id;

      this.subscription.add(
        this._dataService.get_user_profile(this.accountuser_id).subscribe((result) => {
          this.profileInfo = result.result[0];
          this.fileUrl = this.profileInfo.profile_piclink;

          // Add the 'schoolname' to the existing user session data
          parsed.schoolname = this.profileInfo.schoolname;

          // Store the updated session data back in localStorage
          localStorage.setItem('user_loginSession', JSON.stringify(parsed));

          // Update your form with the new 'schoolname' value
          this.profileForm.patchValue(this.profileInfo);
        })
      );
    }
  }


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFileName!: any;

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
    console.log(this.profileForm.value);
    this._dataService.update_profile(this.profileForm.value).subscribe(
      async (result) => {
        if (result && result.status === '200') {
          this.handleSuccess('Profile updated');
          this.upload()
          await this.getProfileData();
        } else {
          this.handleError('Failed to update profile');
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
