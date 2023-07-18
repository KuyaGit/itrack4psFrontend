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

  updateForm() {
    // Implement your form submission logic here
  }

}
