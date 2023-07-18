import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-beneficiaries-form',
  templateUrl: './beneficiaries-form.component.html',
  styleUrls: ['./beneficiaries-form.component.scss']
})
export class BeneficiariesFormComponent {
  formGroup: FormGroup;
  currentStep = 1;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      personal: this.formBuilder.group({
        // Define personal form fields with validators
      }),
      identity: this.formBuilder.group({
        // Define identity form fields with validators
      }),
      address: this.formBuilder.group({
        // Define address form fields with validators
      }),
      family: this.formBuilder.group({
        // Define family form fields with validators
      })
    });
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  goNext(): void {
    if (this.isFormValid()) {
      this.currentStep = 2;
    }
  }

  goBack(): void {
    this.currentStep = 1;
  }

  submitForm(): void {
    if (this.isFormValid()) {
      // Handle form submission logic
    }
  }
}
