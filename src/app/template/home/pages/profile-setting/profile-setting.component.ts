import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  secActive: boolean = false;
  passwordSuccess: boolean = false;
  infoSuccess: boolean = false;

  onPasswordSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    this.passwordSuccess = true;
    this.password = '';
    this.confirmPassword = '';
  }

  onInfoSubmit() {
    this.infoSuccess = true;
    this.name = '';
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }
}
