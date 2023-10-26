import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { accountuser } from 'src/app/services/data';
import { AlertServiceService } from 'src/app/services/alert-service.service';


@Component({
  selector: 'app-beneficiaryreg',
  templateUrl: './beneficiaryreg.component.html',
  styleUrls: ['./beneficiaryreg.component.scss']
})
export class BeneficiaryregComponent {
  registrationForm!: FormGroup;
  hide = false;
  constructor(
    private fb : FormBuilder,
    private _registerService: RegisterService,
    private _alertService: AlertServiceService
  ) {
    this.registrationForm = this.fb.group({
        fName : ['', Validators.required],
        lName : ['', Validators.required],
        householdNumber: ['', Validators.required],
        email : ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', Validators.required],
        account_type: [3],
        profile_piclink: ['default.png']
    });
  }

  registerSubscription() {
    const formData: accountuser  = this.registrationForm.value;
    this._registerService.register(formData).subscribe(
      (response) => {
        console.log('reg success', response.message);
        this._alertService.simpleAlert(
          'success',
          'Success',
          response.message,
          () => {
            // this.router.navigate(['/']);
          }
        );
        this.registrationForm.reset();
      },
      (error) => {
        console.log('error', error);
        if (error.status === 401) {
          this._alertService.simpleAlert(
            'error',
            'Error',
            'You already have an account.'
          );
          this.registrationForm.reset();
        } else if (error.status === 400) {
          this._alertService.simpleAlert(
            'error',
            'Error',
            'Email already exists.'
          );
          this.registrationForm.reset();
        } else {
          this._alertService.simpleAlert(
            'error',
            'Error',
            "Household number doesn't exists on our Database you can't register."
          );
          this.registrationForm.reset();
        }
      }
    );
  }
}
