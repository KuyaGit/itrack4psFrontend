import { Component } from '@angular/core';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.scss']
})
export class BeneficiaryFormComponent {
  fullName = '';
  dateOfBirth = '';
  email = '';
  mobileNumber = '';
  gender = '';
  occupation = '';
  idType = '';
  householdID = '';
  addressType = '';
  nationality = '';
  state = '';
  district = '';
  fatherName = '';
  motherName = '';

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Full Name:', this.fullName);
    console.log('Date of Birth:', this.dateOfBirth);
    console.log('Email:', this.email);
    console.log('Mobile Number:', this.mobileNumber);
    console.log('Gender:', this.gender);
    console.log('Occupation:', this.occupation);
    console.log('ID Type:', this.idType);
    console.log('Household ID:', this.householdID);
    console.log('Address Type:', this.addressType);
    console.log('Nationality:', this.nationality);
    console.log('State:', this.state);
    console.log('District:', this.district);
    console.log('Father Name:', this.fatherName);
    console.log('Mother Name:', this.motherName);
  }
}
