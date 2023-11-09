import { Component, ViewChild, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { accountdetails, getalluser } from 'src/app/services/data';
import { MatDialog } from '@angular/material/dialog';
import { BeneficiaryregComponent } from 'src/app/shared/beneficiaryreg/beneficiaryreg.component';
@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.scss']
})
export class BeneficiaryFormComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id: any = localStorage.getItem('user_loginSession')
  account_type = (JSON.parse(this.id)).account_type;
  alluserData = new MatTableDataSource<getalluser>([]);

  displayedColumns: any[] = [
    'accountuser_id',
    'name',
    'address',
    'mobile_number',
  ];

  private subsription_get_all_user: Subscription = new Subscription();

  constructor (
    private _dataService: DataService,
    public dialog : MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllbeneficiary();
  }
  alluserList!: getalluser[]
  getAllbeneficiary() {
    this.subsription_get_all_user.add(
      this._dataService.get_all_user().subscribe(
        (result) => {
          if (Array.isArray(result.result)) {
            this.alluserList = result.result.filter(
              (item: getalluser) => item.account_type === 3,
            );
            console.log(this.alluserList);
            if (this.paginator && this.sort) {
              this.alluserData = new MatTableDataSource(this.alluserList);
              this.alluserData.paginator = this.paginator;
              this.alluserData.sort = this.sort;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }
  createbeneficiaryAccount(){
    this.viewItemDialog(BeneficiaryregComponent)
  }

  viewItemDialog(component: any) {
    var _popup = this.dialog.open(component, {
      width: '80%',
    });
    _popup.afterClosed().subscribe(item => {
      this.getAllbeneficiary();
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alluserData.filter = filterValue.trim().toLowerCase();
}

}
