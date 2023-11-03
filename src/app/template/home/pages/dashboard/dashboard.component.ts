import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  private subs_get_4psholder: Subscription = new Subscription();
  constructor(
    private _analytics: AnalyticsService
  ) { }
  ngOnInit(): void {
  this.getallStatuscount()
  this.getStatus5()
  this.get4psholderS()
  this.getStatus4()
  this.get4psholderS()
  this.getallworking()
}
FourpsHolder:any = []
get4psholderS() {
  this.subs_get_4psholder.add(
    this._analytics.analytics_get4psholder()
    .subscribe(
      (result) => {
        this.FourpsHolder = result.result[0];
      }
    )
  )
}
status4 : any = []
getStatus4() {
  this.subs_get_4psholder.add(
    this._analytics.analytics_status4()
    .subscribe(
      (result) => {
        this.status4 = result.result[0];
      }
    )
  )
}

allstatusCount : any = [];
beneficiaries : any = [];
getallStatuscount() {
  this.subs_get_4psholder.add(
    this._analytics.allstatuscount()
    .subscribe(
      (result) => {
        this.allstatusCount = result.result[0].analytics_allstatuscount;
        this.beneficiaries = parseInt(this.allstatusCount)
      }
    )

  )
}

status5: any = []
status5parse: any = []
getStatus5() {
  this.subs_get_4psholder.add(
    this._analytics.status5()
    .subscribe(
      (result) => {
            this.status5 = result.result[0].analytics_status5;
            this.status5parse = parseInt(this.status5);
            console.log(this.status5parse)
            this.generatePie()
      }
    )
  )

}


generatePie() {
  const sh = this.status5parse;
  const benef = this.beneficiaries;
  this.pieChartData.datasets[0].data = [sh, benef]
  console.log(this.pieChartData)
}


allworking: any = [];
senior!: number;
junior!: number;
college!: number;


chartdata : any = []
getallworking() {
  this.subs_get_4psholder.add(
    this._analytics.allworking().subscribe((result) => {
      this.allworking = result.result;
      this.senior = parseInt(this.allworking[0].count_8);
      this.junior = parseInt(this.allworking[0].count_12);
      this.college = parseInt(this.allworking[0].count_10);
      console.log(this.senior, this.college, this.junior);
      // Update the barChartData dataset with the received data
      this.allworkingdata.datasets[0].data = [this.junior, this.senior, this.college];
    })
  );
}

public allworkingdata: ChartData<'bar'> = {
  labels: ['Junior Highschool Graduate', 'Senior Highschool Graduate',  'College Graduate'],
  datasets: [
    {
      data: [],
      label: 'Beneficiaries Currently Working',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};



  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  /** Based on the screen size, switch from standard to one column per row */
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    scales: {
      x: {},
      y: {
        min: 1,
        max: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];



  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Continue College', 'Beneficiaries'],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];
}
