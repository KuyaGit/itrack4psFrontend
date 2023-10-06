import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import {  BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatToolbar } from '@angular/material/toolbar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shouldHideToolbar: boolean = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  toolbar!: MatToolbar
  public isMobileLayout = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,


    ) {}
    ngOnInit() {

    }
  ngAfterViewInit() {
    this.breakpointObserver.observe(["(max-width: 912px)"]).subscribe((res) => {
      console.log(res)
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

  }

