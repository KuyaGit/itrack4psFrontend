import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit{
  id: any = localStorage.getItem('user_loginSession')
  account_type = (JSON.parse(this.id)).account_type;
  userInfo: any;
  inputdata : any;
  custdata: any;
  fileUrl: string = '';
  selectedFiles?: FileList;
  imagePreview: string | ArrayBuffer | null = null;
  profileForm: FormGroup;
  private subsription_get_all_user: Subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private ref: MatDialogRef<InformationComponent>,
    private _dataService: DataService,
    private fb: FormBuilder,
  ){
    this.profileForm = this.fb.group({
      accountuser_id : [''],
      email : ['', [Validators.required, Validators.email]],
      fname : ['', [Validators.required]],
      lname : ['', [Validators.required]],
      mobile_number : ['', [Validators.required]],
      address : ['', [Validators.required]],
      account_type: [''],
      schoolname: [''],
      profile_piclink: [''],
    })
  }
  get form(): { [key: string]: AbstractControl } {
    // This function will return the form controls
    return this.profileForm.controls;
  }

  accountTypeText : string = ''

  accountTypeName : any [] = [
    { value : 1 ,
      text : 'Admin'
    },
    {
      value : 2,
      text : '4ps Staff'
    },
    {
      value : 3,
      text : 'Beneficiary'
    },
    {
      value : 4,
      text: 'School Registrar'
    }
  ];

  getAccountType(account_type: number): string {
    const status = this.accountTypeName.find(
      (option) => option.value === account_type
    );
    return status ? status.text : '';
  }
  typeaccount?: number
  ngOnInit(): void {

    this.inputdata = this.data
    this.subsription_get_all_user.add(
      this._dataService.get_user_profile(this.inputdata.code).subscribe((result) => {
        this.userInfo = result.result[0];
        this.fileUrl = this.userInfo.profile_img;
        this.typeaccount = this.userInfo.account_type;
        if (typeof this.userInfo.account_type === 'number') {
          this.userInfo.account_type = Number(this.userInfo.account_type);
          this.userInfo.accountTypeName = this.getAccountType(this.userInfo.account_type);
        }
        this.profileForm.patchValue(this.userInfo);
      })
    )
  }
  closepopup(){
    this.ref.close();
  }


  previewImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  selectedFileName!: any;
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.selectedFileName = this.selectedFiles[0].name;
      this.profileForm.get('profile_piclink')?.setValue(this.selectedFileName);
      const file: File = this.selectedFiles[0];

      // Display a preview of the selected image
      this.previewImage(file);
    }
  }

  clearImagePreview(): void {
    this.imagePreview = null;
  }
}
