import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { accountdetails, child_beneficiary, getalluser, schoolname } from 'src/app/services/data';
import { AddUserService } from 'src/app/services/add-user.service';
import { SchedulerAction, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewchildComponent } from 'src/app/shared/beneficiary/viewchild/viewchild.component';


@Component({
  selector: 'app-schoolregistrar',
  templateUrl: './schoolregistrar.component.html',
  styleUrls: ['./schoolregistrar.component.scss']
})
export class SchoolregistrarComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'child_id',
    'name',
    'status',
    'action',
  ];
  schoolname!: string
  allStudentBeneficiary = new MatTableDataSource<child_beneficiary>([]);
  constructor(
    public dialog: MatDialog,
    private _alertService: AlertServiceService,
    private _addUserService: AddUserService,
    private _dataService: DataService,
  ) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allStudentBeneficiary.filter = filterValue.trim().toLowerCase();
}
  viewItem(child_id: any) {
    console.log(child_id);
    this.viewItemDialog(child_id, 'View Information', ViewchildComponent);
    this.getchildbyschool();
  }

  viewItemDialog(child_id: number, title: string, component: any) {
    var _popup = this.dialog.open(component, {
      width: '80%',
      data: {
        title: title,
        code: child_id
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getchildbyschool();
    })
  }
  statusText : string = ''

  statusName : any [] = [
    {
      value: 1,
      status: 'Elementary Student'
    },
    {
      value: 2,
      status: 'Elementary Graduate continue studying Junior High School'
    },
    {
      value: 3,
      status: 'Junior High School Graduate continue studying Senior High School'
    },
    {
      value: 4,
      status: 'Senior High School Graduate'
    },
    {
      value: 5,
      status: 'Senior High School Graduate continue studying College'
    },
    {
      value: 6,
      status: 'Senior High School Graduate continue studying TESDA'
    },
    {
      value: 7,
      status: 'Junior High School Graduate continue studying TESDA'
    },
    {
      value: 8,
      status: 'Senior High School Graduate Working Now'
    },
    {
      value: 9,
      status: 'College Graduate'
    },
    {
      value: 10,
      status: 'College Graduate and Working Now'
    },
    {
      value: 11,
      status: 'TESDA Graduate'
    },
    {
      value: 12,
      status: 'Junior High School Graduate Working Now'
    }
  ];
  getStatusType(status: number): string {
    const name = this.statusName.find(
      (option) => option.value === status
    );
    return name ? name.status : '';
  }
  ngOnInit(): void {
      this.getchildbyschool()
  }
  private subsription_get_all_user: Subscription = new Subscription();
  alluserList!: child_beneficiary[];
  getchildbyschool() {
    const userSessString = localStorage.getItem('user_loginSession');

    if (userSessString !== null) {
      const parsed = JSON.parse(userSessString);
      this.schoolname = parsed.schoolname;
    }

    this.subsription_get_all_user.add(
      this._dataService.getchildbyschool(this.schoolname).subscribe(
        (result) => {
          console.log(this.schoolname);
          if (Array.isArray(result.result)) {
            this.alluserList = result.result;
            console.log(this.alluserList)
            this.alluserList = this.alluserList.filter((user)=> user.beneficiary_status === 2)
            this.alluserList.forEach((user) => {
              user.statusName = Number(user.status);
              user.statusText = this.getStatusType(user.statusName);
            });

            // Add this part to change the status to the corresponding value
            this.alluserList.forEach((user) => {
              const statusInfo = this.statusName.find((status) => status.value === user.statusName);
              user.status = statusInfo ? statusInfo.status : '';
            });

            if (this.paginator && this.sort) {
              this.allStudentBeneficiary = new MatTableDataSource(this.alluserList);
              this.allStudentBeneficiary.paginator = this.paginator;
              this.allStudentBeneficiary.sort = this.sort;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

}
