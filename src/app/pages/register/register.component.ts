import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { accountuser } from 'src/app/services/data';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registrationForm : FormGroup;
  loginForm : FormGroup;
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
  ) {
    this.registrationForm = this.formBuilder.group({
      fName : ['', Validators.required],
      lName : ['', Validators.required],
      householdNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      account_type: [3],
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
    this.sign_in_btn = document.querySelector("#sign-in-btn") as HTMLElement;
    this.sign_up_btn = document.querySelector("#sign-up-btn") as HTMLElement;
    this.container = document.querySelector(".container") as HTMLElement;
    this.sign_in_btn2 = document.querySelector("#sign-in-btn2") as HTMLElement;
    this.sign_up_btn2 = document.querySelector("#sign-up-btn2") as HTMLElement;

    this.sign_up_btn.addEventListener("click", () => {
      this.container.classList.add("sign-up-mode");
    });

    this.sign_in_btn.addEventListener("click", () => {
      this.container.classList.remove("sign-up-mode");
    });

    this.sign_up_btn2.addEventListener("click", () => {
      this.container.classList.add("sign-up-mode2");
    });

    this.sign_in_btn2.addEventListener("click", () => {
      this.container.classList.remove("sign-up-mode2");
    });

    this.container.classList.add("sign-up-mode");
  }



  registerSubscription() {
    console.log(this.registrationForm.value)
    const formData: accountuser  = this.registrationForm.value;
    this._registerService.register(formData).subscribe(
      (response) => {
        console.log('reg success', response);
        this._alertService.simpleAlert(
          'success',
          'Success',
          'Registration successful',
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
        } else if (error.status === 400) {
          this._alertService.simpleAlert(
            'error',
            'Error',
            'Email already exists.'
          );
        } else if (error.status === 402) {
          this._alertService.simpleAlert(
            'error',
            'Error',
            "Household number doesn't exists on our Database you can't register."
          );
        } else {
          this._alertService.simpleAlert('error', 'Error', 'Failed to Register');
        }
      }
    );
  }
}


