import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-twobarchart',
  templateUrl: './twobarchart.component.html',
  styleUrls: ['./twobarchart.component.scss']
})

export class TwobarchartComponent implements OnInit {
  @Input() chartData: any;
  PrevYear: any= [];
  CurrYear:any = [];
  ForecastValue: any =[];
   MONTHS: any = [
    'JAN',
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
    'DEC'
  ];
  data: any ={
    labels:this.MONTHS,
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '#FFCC00',
        backgroundColor: '#FFCC00',
      },
      {
        label: '',
        data:[],
        borderColor: '#1428A0',
        backgroundColor: '#1428A0',
      },
      {
        label: '',
        data:[],
        borderColor: '#C9DEF1',
        backgroundColor: '#C9DEF1',
      }
    ]
  }; 
  
  constructor(private elementRef: ElementRef,  private util:UtilService) {
  
  }
  ngOnChanges(): void{
    let inputData = JSON.parse(this.chartData);
    let labalarray: any  = Object.keys(inputData?.PrevYear)
    let valuearray: any  = Object.values(inputData?.PrevYear);
    let valueCurrentYear: any  = Object.values(inputData?.CurrYear);
    
    for(let item of valuearray){
     this.PrevYear.push(item?.ExactValue);
    }
    for (let item of valueCurrentYear) {
    
        this.CurrYear.push(item?.ExactValue);
        this.ForecastValue.push(item?.ForecastValue);
    }
    
   
    
    this.data.datasets[0].label = ( (new Date()).getFullYear()-1);
    this.data.datasets[1].label = (new Date()).getFullYear();
    this.data.datasets[2].label = 'Forecast';
    this.data.datasets[0].data = this.PrevYear;
    this.data.datasets[1].data = this.CurrYear;
    this.data.datasets[2].data = this.ForecastValue;
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.getchart();
  }
  getchart() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myCharta`);
    let that = this;
   let  config : any = {
     type: 'bar',
     data: this.data,
     options: {
       responsive: true,
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
           text: 'Chart.js Bar Chart'
         }
       },
       tooltips: {
        mode: 'nearest'
    },
       hover: {
        mode: 'nearest',
        intersect: true
      }
       ,
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
        
           display: true,
       
           ticks: {
            font: {
              size: 10,
             // weight: ""
            },
             // Include a dollar sign in the ticks
             callback: function(value: any, index: any, ticks: any) {
                 return   that.util.numShort(value);
             }
           }
         },
        
       }
     },
   };
    const myChart = new Chart(htmlRef, config
    );
  }

}
