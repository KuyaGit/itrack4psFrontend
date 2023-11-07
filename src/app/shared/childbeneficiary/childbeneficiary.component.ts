import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SchoolService } from 'src/app/services/school.service';
import { schoolname, statusNames, barangayNames, child_beneficiary } from 'src/app/services/data';
import { StatusService } from 'src/app/services/status.service';
import { BarangaysService } from 'src/app/services/barangays.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { DataService } from 'src/app/services/data.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-childbeneficiary',
  templateUrl: './childbeneficiary.component.html',
  styleUrls: ['./childbeneficiary.component.scss']
})
export class ChildbeneficiaryComponent implements OnInit {
  // id: any = localStorage.getItem('user_loginSession')
  // accountuser_id = (JSON.parse(this.id)).accountuser_id;
  schoolnames: schoolname [] = []
  status: statusNames[] = []
  barangay: barangayNames[] = []
  hide = false;
  previousStatusValue?: string;
  childbeneficiary : FormGroup;
  startDate = new Date(2000, 0, 1);
  fileUrl: string = '';
  accountuser_id!: any;


  constructor(
    private fb : FormBuilder,
    private _schoolname: SchoolService,
    private statuslist: StatusService,
    private _barangay: BarangaysService,
    private _alertService: AlertServiceService,
    private _dataService: DataService

  ) {
    this.childbeneficiary = this.fb.group({
      child_id_var: [''],
      accountsdetails_id_var : [''],
      schoolname_var: ['',Validators.required],
      fname_var: ['',Validators.required],
      lname_var: ['',Validators.required],
      birthdate_var: ['',Validators.required],
      snhcourse_var: ['',Validators.required],
      collegecourse_var: ['',Validators.required],
      profile_piclink: ['',Validators.required],
      collegeschoolname_var: ['',Validators.required],
      collegeaddress_var: ['',Validators.required],
      status_var: ['',Validators.required],
      elemschool_var: ['',Validators.required],
      elemaddress_var: ['',Validators.required],
      junschool_var: ['',Validators.required],
      junaddress_var: ['',Validators.required],
      shschoolname_var: ['',Validators.required],
      scschooladdress_var: ['',Validators.required],
      tesdacourse_var: ['',Validators.required],
      work_var: ['',Validators.required]
    })
    this.childbeneficiary.controls['status_var'].valueChanges.subscribe(value => this.statusRequired(value))
  }
  get form() : { [key: string]: AbstractControl} {
    return this.childbeneficiary.controls
  }

  ngOnInit() {
    this.schoolnames = this._schoolname.getSchoolNames();
    this.status = this.statuslist.getStatusList();
    this.barangay = this._barangay.getAllBarangayNames();

    const userSessString = localStorage.getItem('user_loginSession');
    if (userSessString !== null) {
      const parsed = JSON.parse(userSessString);
      this.accountuser_id = parsed.accountuser_id;
    }
    console.log(this.accountuser_id);
  }

  addbeneficiariesSubscription() {
    console.log(this.childbeneficiary.value)
    this.childbeneficiary.get("accountsdetails_id_var")?.setValue(this.accountuser_id)
    const formData = this.childbeneficiary.value;
    this._dataService.addchildbeneficiary(formData).subscribe(
      async (result) => {
        if (result && result.status === '200') {
          this.handleSuccess('Beneficiary added successfully');
          this.upload()
        } else {
          this.handleError('Failed to add beneficiary information');
        }
      },
      (error) => {
        this.handleError('An error occurred while creating beneficiaries profile');
        console.error(error);
      }
    );

  }


  statusRequired(value: string) {
    const status = this.childbeneficiary.get('status_var');
    console.log('Status value:', status?.value);

    if (status?.value == 1) {
      const fieldsToUpdate = ['schoolname_var', 'elemschool_var', 'elemaddress_var'];

      // Clear validators for fields not in fieldsToUpdate
      const fieldsToClearValidators = [
        'snhcourse_var',
        'collegeschoolname_var',
        'collegeaddress_var',
        'collegecourse_var',
        'tesdacourse_var',
        'junschool_var',
        'junaddress_var',
        'shschoolname_var',
        'scschooladdress_var',
        'work_var'
      ];

      fieldsToUpdate.forEach(fieldName => {
        const field = this.childbeneficiary.get(fieldName);
        if (field) {
          field.setValidators(Validators.required);
        }
        field?.updateValueAndValidity();
      });

      fieldsToClearValidators.forEach(fieldName => {
        const field = this.childbeneficiary.get(fieldName);
        if (field) {
          field.clearValidators();
          field?.updateValueAndValidity();
        }
      });
    }
    else if( status?.value == 2){
    const fieldsToUpdate = ['schoolname_var', 'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var',];
    const fieldsToClearValidators = [
      'snhcourse_var',
      'collegeschoolname_var',
      'collegeaddress_var',
      'collegecourse_var',
      'tesdacourse_var',
      'shschoolname_var',
      'scschooladdress_var',
      'work_var'
    ];
    fieldsToUpdate.forEach(fieldName => {
      const field = this.childbeneficiary.get(fieldName);
      if (field) {
        field.setValidators(Validators.required);
      }
      field?.updateValueAndValidity();
    });

    fieldsToClearValidators.forEach(fieldName => {
      const field = this.childbeneficiary.get(fieldName);
      if (field) {
        field.clearValidators();
        field?.updateValueAndValidity();
      }
    });
    }
    else if( status?.value == 3){
    const fieldsToUpdate = ['schoolname_var', 'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var',];
    const fieldsToClearValidators = [
      'collegeschoolname_var',
      'collegeaddress_var',
      'collegecourse_var',
      'tesdacourse_var',
      'work_var'
    ];
      fieldsToUpdate.forEach(fieldName => {
        const field = this.childbeneficiary.get(fieldName);
        if (field) {
          field.setValidators(Validators.required);
        }
        field?.updateValueAndValidity();
      });

      fieldsToClearValidators.forEach(fieldName => {
        const field = this.childbeneficiary.get(fieldName);
        if (field) {
          field.clearValidators();
          field?.updateValueAndValidity();
        }
      });
    }
    else if( status?.value == 4){
    const fieldsToUpdate = [
      'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var',];
    const fieldsToClearValidators = [
      'schoolname_var',
      'collegeschoolname_var',
      'collegeaddress_var',
      'collegecourse_var',
      'tesdacourse_var',
      'work_var'
    ];

      fieldsToUpdate.forEach(fieldName => {
        const field = this.childbeneficiary.get(fieldName);
        if (field) {
          field.setValidators(Validators.required);
        }
        field?.updateValueAndValidity();
      });

      fieldsToClearValidators.forEach(fieldName => {
        const field = this.childbeneficiary.get(fieldName);
        if (field) {
          field.clearValidators();
          field?.updateValueAndValidity();
        }
      });
      }
      else if( status?.value == 5){
        const fieldsToUpdate = ['schoolname_var', 'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var','collegeschoolname_var','collegeaddress_var','collegecourse_var',];
        const fieldsToClearValidators = [
          'tesdacourse_var',
          'work_var'
        ];
        fieldsToUpdate.forEach(fieldName => {
          const field = this.childbeneficiary.get(fieldName);
          if (field) {
            field.setValidators(Validators.required);
          }
          field?.updateValueAndValidity();
        });

        fieldsToClearValidators.forEach(fieldName => {
          const field = this.childbeneficiary.get(fieldName);
          if (field) {
            field.clearValidators();
            field?.updateValueAndValidity();
          }
        });
      }
      else if( status?.value == 6){
        const fieldsToUpdate = ['schoolname_var', 'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var', 'tesdacourse_var',];
        const fieldsToClearValidators = [
          'collegeschoolname_var',
          'collegeaddress_var',
          'collegecourse_var',
          'work_var'
        ];
        fieldsToUpdate.forEach(fieldName => {
          const field = this.childbeneficiary.get(fieldName);
          if (field) {
            field.setValidators(Validators.required);
          }
          field?.updateValueAndValidity();
        });

        fieldsToClearValidators.forEach(fieldName => {
          const field = this.childbeneficiary.get(fieldName);
          if (field) {
            field.clearValidators();
            field?.updateValueAndValidity();
          }
        });
      }
      else if( status?.value == 7){
        const fieldsToUpdate = ['schoolname_var', 'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var',  'tesdacourse_var',];
        const fieldsToClearValidators = [
          'collegeschoolname_var',
          'collegeaddress_var',
          'collegecourse_var',
          'work_var','snhcourse_var','shschoolname_var', 'scschooladdress_var',
        ];
        fieldsToUpdate.forEach(fieldName => {
          const field = this.childbeneficiary.get(fieldName);
          if (field) {
            field.setValidators(Validators.required);
          }
          field?.updateValueAndValidity();
        });

        fieldsToClearValidators.forEach(fieldName => {
          const field = this.childbeneficiary.get(fieldName);
          if (field) {
            field.clearValidators();
            field?.updateValueAndValidity();
          }
        });
        }
        else if( status?.value == 8){
          const fieldsToUpdate = ['elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var', 'work_var'];
          const fieldsToClearValidators = [
            'schoolname_var',
            'collegeschoolname_var',
            'collegeaddress_var',
            'collegecourse_var',
            'tesdacourse_var',
          ];
          fieldsToUpdate.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.setValidators(Validators.required);
            }
            field?.updateValueAndValidity();
          });

          fieldsToClearValidators.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.clearValidators();
              field?.updateValueAndValidity();
            }
          });
        }
        else if( status?.value == 9){
          const fieldsToUpdate = [ 'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var', 'collegeschoolname_var',
          'collegeaddress_var',
          'collegecourse_var', ];
          const fieldsToClearValidators = [
            'schoolname_var',
            'tesdacourse_var',
            'work_var'
          ];
          fieldsToUpdate.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.setValidators(Validators.required);
            }
            field?.updateValueAndValidity();
          });

          fieldsToClearValidators.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.clearValidators();
              field?.updateValueAndValidity();
            }
          });
        }
        else if( status?.value == 10){
          const fieldsToUpdate = [ 'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var', 'collegeschoolname_var',
          'collegeaddress_var',
          'collegecourse_var', 'work_var'];
          const fieldsToClearValidators = [
            'schoolname_var',
            'tesdacourse_var',
          ];
          fieldsToUpdate.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.setValidators(Validators.required);
            }
            field?.updateValueAndValidity();
          });

          fieldsToClearValidators.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.clearValidators();
              field?.updateValueAndValidity();
            }
          });
        }
        else if( status?.value == 11){
          const fieldsToUpdate = ['tesdacourse_var' ];
          const fieldsToClearValidators = [
            'elemschool_var', 'elemaddress_var','junschool_var','junaddress_var', 'snhcourse_var','shschoolname_var', 'scschooladdress_var', 'collegeschoolname_var',
          'collegeaddress_var',
          'collegecourse_var', 'work_var',
            'schoolname_var',

          ];
          fieldsToUpdate.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.setValidators(Validators.required);
            }
            field?.updateValueAndValidity();
          });

          fieldsToClearValidators.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.clearValidators();
              field?.updateValueAndValidity();
            }
          });
        }
        else if( status?.value == 12){
          const fieldsToUpdate = ['elemschool_var', 'elemaddress_var','junschool_var','junaddress_var' ];
          const fieldsToClearValidators = [
            'tesdacourse_var',
            'snhcourse_var',
            'shschoolname_var',
            'scschooladdress_var',
            'collegeschoolname_var',
            'collegeaddress_var',
            'collegecourse_var',
            'work_var',
            'schoolname_var',
          ];
          fieldsToUpdate.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.setValidators(Validators.required);
            }
            field?.updateValueAndValidity();
          });

          fieldsToClearValidators.forEach(fieldName => {
            const field = this.childbeneficiary.get(fieldName);
            if (field) {
              field.clearValidators();
              field?.updateValueAndValidity();
            }
          });
        }
    else {
      // Clear validators for all fields when status is not '1'
      const allFields = [
        'schoolname_var',
        'elemschool_var',
        'elemaddress_var',
        'snhcourse_var',
        'collegeschoolname_var',
        'collegeaddress_var',
        'collegecourse_var',
        'tesdacourse_var',
        'junschool_var',
        'junaddress_var',
        'shschoolname_var',
        'scschooladdress_var',
        'work_var'
      ];

      allFields.forEach(fieldName => {
        const field = this.childbeneficiary.get(fieldName);
        if (field) {
          field.clearValidators();
          field?.updateValueAndValidity();
        }
      });
    }
  }





  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFileName!: any;

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  clearImagePreview(): void {
    this.imagePreview = null;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this._dataService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file: File = this.selectedFiles[0];

      // Check the file size
      if (file.size <= 2 * 1024 * 1024) { // 2MB or smaller
        // Check the aspect ratio
        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = () => {
          const width = image.width;
          const height = image.height;

          if (width === height) { // Square (2x2 pixels)
            this.selectedFileName = file.name;
            this.childbeneficiary.get('profile_piclink')?.setValue(this.selectedFileName);

            // Display a preview of the selected image
            this.previewImage(file);
          } else {
            this.handleError('Image must be a square image.')

          }
        };
      } else {
        this.handleError('File size exceeds the maximum allowed size (2MB).');
      }
    }
  }
  private handleSuccess(message: any) {
    this._alertService.simpleAlert('success', 'success', message);
  }

  private handleError(message: any) {
    this._alertService.simpleAlert('error', 'Error', message);
  }
}
