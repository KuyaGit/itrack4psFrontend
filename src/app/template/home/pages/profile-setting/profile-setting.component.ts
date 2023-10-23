import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl,FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { accoundetails } from 'src/app/services/data';


@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit{
  profileInfo : accoundetails[] = [];
  hide = true;
  isInputDisabled = false;
  defaultProfilePhotoUrl = 'assets/default-profile-photo.png';
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
      password :['', [Validators.required]],
      confirmPassword : ['', [Validators.required]],
      mobile_number : ['', [Validators.required]],
      address : ['', [Validators.required]],


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

  onPasswordSubmit() {
    if (this.profileForm.controls['password'] !== this.profileForm.controls['confirmPassword']) {
      alert("Passwords do not match. Please try again.");
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhoto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  userPhoto: string = 'assets/defaut-profile-photo.jpg';
  accountuser_id : number = 0;


  getProfileData() {
    const userSessString = localStorage.getItem('user_loginSession');
    if (userSessString !== null) {
      const parsed = JSON.parse(userSessString);
      this.accountuser_id = parsed.accountuser_id;
    }
    this.subscription.add(
      this._dataService.get_user_profile(this.accountuser_id).subscribe((result) => {
        this.profileInfo = result.result[0];
        this.profileForm.patchValue(this.profileInfo);
      })
    );
  }
}
