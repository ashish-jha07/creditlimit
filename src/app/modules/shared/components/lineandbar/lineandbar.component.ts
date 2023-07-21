import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { UtilService } from 'src/app/core/services/util/util.service';


@Component({
  selector: 'app-lineandbar',
  templateUrl: './lineandbar.component.html',
  styleUrls: ['./lineandbar.component.scss']
})
export class LineandbarComponent implements OnInit {
  @Input() chartData: any;
  labelsArray: any =[];
  WeeklyStockVol: any = [];
  WOSVol: any = [];
  data: any = {
    labels: ['21.45W', '21.46W', '21.47W', '21.48W', '21.49W', '21.50W', '21.51W', '21.52W',],
    datasets: [
      {
        label: 'WOS',
        data: [40, 30, 60, 70, 10, 40, 30, 60, 70, 10],
        borderColor: '#828282',
        borderWidth: 0.5,
        backgroundColor: '#000',
        yAxisID: 'y1',
        stack: 'combined',
        pointStyle: 'circle',
       // pointRadius: 10,
       // pointHoverRadius: 15,
      },
      {
        label: 'Stock',
        data: [800, 500, 400, 900, 600, 200, 950, 150],
        borderColor: '#828282',
        backgroundColor:'#1428A0',
        stack: 'combined',
        yAxisID: 'y',
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
   
    let colorArray : any = [];
    for(let item of inputData){
     this.labelsArray.push(item.WeekYear);
     this.WeeklyStockVol.push(item.WeeklyStockVol);
     if(item.IsThresholdBreach){
      colorArray.push('#FF0000')
     }else {
      colorArray.push('#000000')
     }
    
     this.WOSVol.push(item.WOSVol);
    }
  
    
   
    
    this.data.labels = this.labelsArray;

    this.data.datasets[0].data = this.WOSVol;
    this.data.datasets[0].backgroundColor = colorArray;
    
    this.data.datasets[1].data = this.WeeklyStockVol;
  //   for (i = 0; i < myChart.data.datasets[0].data.length; i++) {
  //     if (myChart.data.datasets[0].data[i] > 100) {
  //         pointBackgroundColors.push("#90cd8a");
  //     } else {
  //         pointBackgroundColors.push("#f58368");
  //     }
  // }

  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.getchart();
  }
  getchart() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myCharta`);
  let that =  this;
    let    config : any = {
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
          align: 'start',
          labels: {
            display: false,
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
            title: {
              display: true,
              text: 'Thousands'
            },
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
             // weight: ""
            },
            // Include a dollar sign in the ticks
            callback: function(value: any, index: any, ticks: any) {
              return  that.util.numShort(value);
            }
        },
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
