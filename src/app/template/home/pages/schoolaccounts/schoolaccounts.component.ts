import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { getalluser } from 'src/app/services/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-schoolaccounts',
  templateUrl: './schoolaccounts.component.html',
  styleUrls: ['./schoolaccounts.component.scss']
})
export class SchoolaccountsComponent implements OnInit {
  alluserData = new MatTableDataSource<getalluser>([]);
  displayedColumns: any[] = [
    'accountuser_id',
    'name',
    'address',
    'mobile_number',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private subsription_get_all_user: Subscription = new Subscription();

  constructor (
    private _dataService: DataService,
    public dialog : MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllbeneficiary();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alluserData.filter = filterValue.trim().toLowerCase();
}
  alluserList!: getalluser[]
  getAllbeneficiary() {
    this.subsription_get_all_user.add(
      this._dataService.get_all_user().subscribe(
        (result) => {
          if (Array.isArray(result.result)) {
            this.alluserList = result.result.filter(
              (item: getalluser) => item.account_type === 4,
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
}
