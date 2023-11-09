import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { Subscription, forkJoin } from 'rxjs';
import { Chart, registerables } from 'node_modules/chart.js'
import { getalluser } from 'src/app/services/data';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
Chart.register(...registerables)
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'accountsdetails_id',
    'name',
    'mobile_number',
    'address',
    'account_type',
  ];
  alluserData = new MatTableDataSource<getalluser>([]);
  constructor(
    private _analytics: AnalyticsService,
    private _dataService: DataService,
  ) { }
  ngOnInit(): void {
    this.combinedSubscription()
    this.getallworking()
    this.get4psholderS()
    this.getStatus4()
    this.getallUser()
    this.getallstatussum()
}
combinedSubscription() {
  const allStatusCount$ = this._analytics.allstatuscount();
  const status5$ = this._analytics.status5();

  forkJoin([allStatusCount$, status5$]).subscribe(
    ([allStatusCountResult, status5Result]) => {
      this.allstatusCount = allStatusCountResult.result[0].analytics_allstatuscount;
      this.beneficiaries = parseInt(this.allstatusCount);

      this.status5 = status5Result.result[0].analytics_status5;
      this.status5parse = parseInt(this.status5);

      this.renderPieChart();
    },
    (error) => {
      // Handle errors
      console.log(error);
    }
  );
}

private get_all_status_sum : Subscription = new Subscription();
countValues : any
allstatusSum: any
linechart: any;
renderLineChart() {
  this.linechart = new Chart("lineChart", {
    type: 'bar',
    data: {
      labels: ['Status 1','Status 2','Status 3','Status 4','Status 5','Status 6','Status 7','Status 8','Status 9','Status 10','Status 11','Status 12'],
      datasets: [{
        label: 'Count of Status that already approved by school',
        data: [],
        backgroundColor:["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]


      }]
    }
  })
}

getallstatussum() {
  this.get_all_status_sum.add(
    this._analytics.allstatussum().subscribe(
      (result) => {
        this.allstatusSum = result.result[0];
        this.countValues = Object.values(this.allstatusSum); //convert object into array
        this.renderLineChart()
        if (this.linechart) {
          console.log(this.countValues)
          // Update the data property of the chart with the extracted data
          console.log(this.linechart)
          this.linechart.data.datasets[0].data = this.countValues;
          this.linechart.update();
        }
      }
    )
  );
}


public mychart : any
renderPieChart() {
  this.mychart = new Chart("pieChart", {
    type: 'pie',
    data: {
      labels: ['Continue College', 'Beneficiaries'],
      datasets: [{
        label: 'Number of Beneficiaries',
        data: [this.status5parse,this.beneficiaries],
        borderWidth: 1,
        hoverOffset: 4
      }]
    },
  })
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
public beneficiaries : any = [];
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
private subs_get_4psholder: Subscription = new Subscription();
status5: any = []
public status5parse: any = []
getStatus5() {
  this.subs_get_4psholder.add(
    this._analytics.status5()
    .subscribe(
      (result) => {
            this.status5 = result.result[0].analytics_status5;
            this.status5parse = parseInt(this.status5);
      }
    )
  )
}


allworking: any = [];
senior!: number;
junior!: number;
college!: number;
public chartPie : any;

private sub_get_allworking : Subscription = new Subscription();
chartdata : any = []
getallworking() {
  this.sub_get_allworking.add(
    this._analytics.allworking().subscribe((result) => {
      this.allworking = result.result;
      this.senior = parseInt(this.allworking[0].count_8);
      this.junior = parseInt(this.allworking[0].count_12);
      this.college = parseInt(this.allworking[0].count_10);
      this.allworkingdata.datasets[0].data = [this.junior, this.senior, this.college];

      // After data retrieval, call a function to render the bar chart
      this.renderBarChart();
    })
  );
}

renderBarChart() {
  if (this.chart && this.chart.chart) {
    this.chart.chart.update();
  }
}


public allworkingdata: ChartData<'bar'> = {
  labels: ['Junior Highschool Graduate', 'Senior Highschool Graduate',  'College Graduate'],
  datasets: [
    {
      data: [],
      label: 'Beneficiaries Currently Working',
      backgroundColor: [
        'rgb(105,92,254)',
      ],
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
  private subsription_get_all_user: Subscription = new Subscription();

  alluserList!: getalluser[];
  getallUser() {
    this.subsription_get_all_user.add(
      this._dataService.get_all_user().subscribe(
        (result) => {
          if (Array.isArray(result.result)) {
            this.alluserList = result.result;
            this.alluserList.forEach((user)=>{
              user.account_type = Number(user.account_type);
              user.accountTypeName = this.getAccountType(user.account_type);
            })
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
}
