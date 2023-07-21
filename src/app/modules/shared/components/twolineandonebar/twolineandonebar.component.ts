
  import { Component, ElementRef, Input, OnInit } from '@angular/core';

  import { Chart, registerables } from 'chart.js';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-twolineandonebar',
  templateUrl: './twolineandonebar.component.html',
  styleUrls: ['./twolineandonebar.component.scss']
})
export class TwolineandonebarComponent implements OnInit {

    @Input() chartData: any;
    @Input() salesCAR: any;
    @Input() salesCPay: any;
    salesCARvalue: any = [];
    salesCPayment: any = [];
    labelsF: any = [];
    ForecastValue: any = [];
    data: any = {
      labels: [ 'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'],
      datasets: [
        {
          label: 'Sales Capacity (AVG AR Days)',
          data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
          borderColor: '#4d5396',
          borderWidth: 1,
          backgroundColor: '#4d5396',
          tension: 0
        
        //  stack: 'combined',
          // pointStyle: 'circle',
          // pointRadius: 10,
          // pointHoverRadius: 15,
        },
        {
          label: 'Sales Capacity (Payment Terms)',
          data: [110, 110, 110, 110, 110, 110, 110, 110, 110, 110],
          borderColor: '#000',
          borderWidth: 1,
          backgroundColor: '#000',
          tension: 0
        
          //stack: 'combined',
          // pointStyle: 'circle',
          // pointRadius: 10,
          // pointHoverRadius: 15,
        },
        {
          label: 'Stock',
          data: [800, 500, 400, 900, 600, 200, 950, 150],
          borderColor: '#57c9af',
          backgroundColor:'#57c9af',
          stack: 'combined',
          barPercentage:0.2,
          barThickness:5,
          type: 'bar'
        },
        
        // {
        //   label: 'Dataset 1',
        //   data: [40, 30, 60, 70, 10],
        //   backgroundColor: Object.values({
        //     red: 'rgb(255, 99, 132)',
        //     orange: 'rgb(255, 159, 64)',
        //     yellow: 'rgb(255, 205, 86)',
        //     green: 'rgb(75, 192, 192)',
        //     blue: 'rgb(54, 162, 235)',
  
        //   }),
        // }
      ]
    };
   
    constructor(private elementRef: ElementRef, private util:UtilService) {
      
    }
    ngOnChanges(): void{
      let inputData = JSON.parse(this.chartData);
   
     // let valueCurrentYear: any  = Object.values(inputData.CurrYear);
      
    
      for (let item of inputData.ForecastData) {
        this.salesCARvalue.push( inputData.BasicAvgARDays);
        this.salesCPayment.push( inputData.BasisPaymentTermDays);
         this.labelsF.push(this.data.labels[item.ProjectionMonth-1]);
         this.ForecastValue.push(item.ProjectionAmount);
      }

this.data.labels = this.labelsF;
    this.data.datasets[2].label = 'Sales Forecast';
    this.data.datasets[0].data = this.salesCARvalue;
    this.data.datasets[1].data = this.salesCPayment;
    this.data.datasets[2].data = this.ForecastValue;
    }
    ngOnInit(): void {
  
    }
    ngAfterViewInit(): void {
      this.getchart();
    }
    getchart() {
      let htmlRef = this.elementRef.nativeElement.querySelector(`#myCharta`);
     let that =  this;
      let   config : any = {
        type: 'line',
        data: this.data,
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            legend: {
              display: false,
              position: 'bottom',
              align: 'flex-start',
              labels: {
                boxWidth: 12,
                usePointStyle:true,
                pointStyle: 'rectRounded'
              },
            },
            title: {
              display: false,
              text: 'Chart.js Line Chart - Multi Axis'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value: any, index: any, ticks: any) {
                    return  that.util.numShort(value);
                }
              }
            }
            // y1: {
            //   type: 'linear',
            //   display: true,
            //   position: 'right',
            //   beginAtZero: true,
            //   // grid line settings
            //   grid: {
            //     drawOnChartArea: false, // only want the grid lines for one axis to show up
            //   },
            // },
          }
        },
      };
      const myChart = new Chart(htmlRef, config
      );
    }
  }
