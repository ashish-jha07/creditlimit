import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-lineandbarwithoneyaxis',
  templateUrl: './lineandbarwithoneyaxis.component.html',
  styleUrls: ['./lineandbarwithoneyaxis.component.scss']
})
export class LineandbarwithoneyaxisComponent implements OnInit {
  @Input() chartData: any;
  labelsArray: any =[];
  WeeklyStockVol: any = [];
  WOSVol: any = [];
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
        label: 'WOS',
        data: [40, 30, 60, 70, 10, 40, 30, 60, 70, 10],
        borderColor: '#828282',
        borderWidth: 0.5,
        backgroundColor: '#000',
      
        stack: 'combined',
        pointStyle: 'circle',
        //pointRadius: 10,
        //pointHoverRadius: 15,
      },
      {
        label: 'Stock',
        data: [800, 500, 400, 900, 600, 200, 950, 150],
        borderColor: '#828282',
        backgroundColor:'#1428A0',
        stack: 'combined',
       
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
   config : any = {
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
  constructor(private elementRef: ElementRef) {
  
  }
  ngOnChanges(): void{
    let inputData = JSON.parse(this.chartData);

    
    for(let item of inputData){
     this.labelsArray.push(item.WeekYear);
     this.WeeklyStockVol.push(item.WeeklyStockVol);
     this.WOSVol.push(item.WOSVol);
    }
  
    
   
    
    this.data.labels = this.labelsArray;

    this.data.datasets[0].data = this.WOSVol;
    this.data.datasets[1].data = this.WeeklyStockVol;

  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.getchart();
  }
  getchart() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myCharta`);
    const myChart = new Chart(htmlRef, this.config
    );
  }
}