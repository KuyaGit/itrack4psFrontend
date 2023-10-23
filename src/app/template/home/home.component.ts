import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import {  BreakpointObserver } from "@angular/cdk/layout";
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionService } from 'src/app/services/session.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shouldHideToolbar: boolean = true;
  id: any = localStorage.getItem('user_loginSession')
  account_type = (JSON.parse(this.id)).account_type;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  toolbar!: MatToolbar
  public isMobileLayout = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private _sessionService: SessionService,
    private _alertService: AlertServiceService
    ) {
      this.bnIdle.startWatching(300).subscribe((res) => {
        if(res) {
            this._sessionService.logout();
            this.router.navigate(['']);
            this._alertService.simpleAlert('error', 'Error', 'Session Expired');

      }
    })
  }
    ngOnInit() {
      console.log(this.account_type)
    }
  ngAfterViewInit() {
    this.breakpointObserver.observe(["(max-width: 912px)"]).subscribe((res) => {
      if (res.matches) {
        this.isMobileLayout = true;
        this.sidenav.mode = "over";
        this.sidenav.close();

      } else {
        this.isMobileLayout = false;
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges();
    }
    logoutModal(){
      Swal.fire({
        icon: 'error',
        title: 'Warning',
        text: 'Are you sure to Logout',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#d33'
      }).then((result)=> {
        if(result.isConfirmed){
          this.logout();
        }

      },(error: any) => console.log(error))
    }

    logout(){
      localStorage.removeItem('user_loginSession');
      window.location.reload();
    }
  }

