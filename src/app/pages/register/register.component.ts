import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { accountuser } from 'src/app/services/data';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registrationForm : FormGroup;
  loginForm : FormGroup;
  loginSubscription: Subscription = new Subscription();
  sign_in_btn!: HTMLElement;
  sign_up_btn!: HTMLElement;
  container!: HTMLElement;
  sign_in_btn2!: HTMLElement;
  sign_up_btn2!: HTMLElement;

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private _alertService: AlertServiceService,
    private _registerService: RegisterService,
    private _loginService: LoginService,
    private _sessionService: SessionService
  ) {
    this.registrationForm = this.formBuilder.group({
      fName : ['', Validators.required],
      lName : ['', Validators.required],
      householdNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profile_piclink: 'https://itrack4ps.s3.ap-southeast-2.amazonaws.com/default.png'
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }
  get form(): { [key: string]: AbstractControl } {
    // This function will return the form controls
    return this.registrationForm.controls;
  }

  ngOnInit() {
  }

  
  ngOnDestroy(): void {
    
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
            this.router.navigate(['/']);
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


