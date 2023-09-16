import { Component } from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  shouldHideToolbar: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  constructor(
    private breakpointObserver: BreakpointObserver
    ) {}
  ngAfterViewInit() {
    this.breakpointObserver.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
        this.shouldHideToolbar = res.matches;

      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
        ;
      }
    });
    this.breakpointObserver.observe([Breakpoints.Handset, '(min-width: 800px && max-width: 375px)']).subscribe(result => {

    });
  }
  }
