import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UtilService } from 'src/app/core/services/util/util.service';
@Component({
  selector: 'app-partnerinvestment',
  templateUrl: './partnerinvestment.component.html',
  styleUrls: ['./partnerinvestment.component.scss']
})
export class PartnerinvestmentComponent implements OnInit {
  @Input() chartData: any;
  labels:any= [ 'JAN',
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
      'DEC'];
  constructor(private elementRef: ElementRef,  private util:UtilService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    let inputData = JSON.parse(this.chartData);
    this.drowchartbyChartjs(inputData);
 
  }
  drowchartbyChartjs(inputData: any){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myCharta`);
 //   htmlRef.fontSize = '9px !important';
    htmlRef.font = "semibold 10px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    let data: any = 
    
    {
    labels: [],
    datasets: [
      {
        label: 'Investment Days',
        data: [],
        borderColor: '#828282',
        borderWidth: 0.5,
        backgroundColor: '#000',
        yAxisID: 'y1',
        stack: 'combined',
        pointStyle: 'circle',
      //  pointRadius: 6,
       // pointHoverRadius: 8,
        order:0
      },
      {
        label: 'Investment Value',
        data: [],
        borderColor: '#828282',
        backgroundColor:'#1428A0',
        stack: 'combined',
        yAxisID: 'y',
        type: 'bar',
        barPercentage:0.2,
        barThickness:5,
        order:1
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
    let colorArray : any = [];
  for(let item of inputData.monthData){
    //  let a : any = that.labels[item.Months-1];
    //  let datarow: any = [that.labels[item.Months-1], item.Limit, item.Utilization, item.UtilizationPercentage];
      
      data.labels.push(this.labels[item.Month-1]) ;
      data.datasets[1].data.push(item.InvestmentValue) ;
      data.datasets[0].data.push(item.InvestmentDays) ;
      if(item.IsThresholdBreach){
        colorArray.push('#FF0000')
       }else {
        colorArray.push('#000000')
       }
     // data.datasets[2].data.push(item.Utilization +2000000) ;
    //  data.datasets[2].data.push(item.Utilization ) ;
    }
    data.datasets[0].backgroundColor = colorArray;
    data.labels = this.labels;
    let that = this;
    let    config : any = {
      type: 'line',
      
      data: data,
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
          x:{
            
            ticks: {
              font: {
                size: 8,
               // weight: ""
              },
             // color: 'red',
         
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            // title: {
            //   display: true,
            //   text: 'Y axis title'
            // },
            ticks: {
              font: {
                size: 10,
               // weight: ""
              },
              // Include a dollar sign in the ticks
              callback: function(value: any, index: any, ticks: any) {
                  return  that.util.numShort(value);
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            ticks: {
              font: {
                size: 10,
                weight: "bold"
              },
              // Include a dollar sign in the ticks
              callback: function(value: any, index: any, ticks: any) {
                  return  value.toLocaleString('en-IN');
              }},
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      },
    };
  
    const myChart = new Chart(htmlRef, config
    );
  }
}
