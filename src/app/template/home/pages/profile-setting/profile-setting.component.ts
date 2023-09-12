import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent {
  name: string = '';
  email: string = '';
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
    this.email = '';
  }
}
