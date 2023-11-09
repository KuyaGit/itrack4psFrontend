import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, AbstractControl,FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Subscription, filter } from 'rxjs';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { accountdetails, userprofile } from 'src/app/services/data';
import { HttpResponse } from '@angular/common/http';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { CropperDialogResult, ImagecropperdialogComponent } from 'src/app/shared/imagecropperdialog/imagecropperdialog.component';
import { MatDialog } from '@angular/material/dialog';



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

  previewImage(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(blob);
  }
  clearImagePreview(): void {
    this.imagePreview = null;
  }
  upload() {
    if (this.croppedResult) {
      const blob = this.croppedResult.blob;
      const file = new File([blob], this.selectedFileName, { type: 'image/jpeg' });
  
      this._dataService.upload(file).subscribe({
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
  }
  

  imageChangedEvent: any = '';
  croppedImage: any = '';

  dialog = inject(MatDialog)
  imageHeight = signal(200);
  @Input({ required: true }) set height( val: number){
    this.imageHeight.set(val)
  }

  imageWidth = signal(200)
  @Input({ required: true }) set width( val: number){
  this.imageWidth.set(val)
  }
  croppedResult: CropperDialogResult | undefined;
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File = this.selectedFiles[0];
      const dialogRef = this.dialog.open(ImagecropperdialogComponent, {
        data: {
          image: file,
          width: this.imageWidth(),
          height: this.imageHeight(),
        },
        width: "50%",
      });
  
      dialogRef.afterClosed().subscribe((result: CropperDialogResult) => {
        
        if (result) {
          this.croppedResult = result;
          // You can use result.blob or any other property based on your CropperDialogResult interface
          // this.uploadImage(result.blob);
  
          this.selectedFileName = file.name;
          this.profileForm.get('profile_piclink')?.setValue(this.selectedFileName);
  
          // Display a preview of the selected image
          this.previewImage(result.blob);
        }
      });
    }
  }
  croppedImageURL = signal<string | undefined>(undefined);
  imageSource = computed(() => {
    return this.croppedImageURL() ?? this.fileUrl;
  });

  update() {
    console.log(this.profileForm.value);
    this.upload()
    this._dataService.update_profile(this.profileForm.value).subscribe(
      async (result) => {
        if (result && result.status === '200') {
          this.handleSuccess('Profile updated');
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

