import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  @Input() chartData: any;
  Weeks: any =[];
  Totals: any = [];
  data: any = {
    labels: ['W1', 'W2', 'W3', 'W4'],
    datasets: [
    
      {
        label: 'Weeks',
        data: [25, 10, 30, 45,],
        borderColor: '#828282',
        borderWidth: 0.5,
        backgroundColor:'#1428A0',
        pointStyle: 'circle',
       // pointRadius: 10,
//pointHoverRadius: 15,
      },
      
    ]
  };
   config : any = {
    type: 'line',
    data: this.data,
    options: {
      plugins: {
        title: {
          display: false,
          text: (ctx: any) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
        },
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
      },

    scales: {
      x: {
        
        ticks: {
          padding	:5,
         showLabelBackdrop: true,
          align:'center',
          crossAlign: 'center',
          position :'center',
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          // callback: function(val, index) {
          //   // Hide every 2nd tick label
          //   return index % 2 === 0 ? this.getLabelForValue(val) : '';
          // },
         // color: 'red',
         
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
            // Include a dollar sign in the ticks
            callback: function(value: any, index: any, ticks: any) {
                return  value + '%';
            }
        }
    }
      // y: {
      
      // }
    }
    },
  };
  constructor(private elementRef: ElementRef) {
  
  }
  ngOnChanges(): void{
    let inputData = JSON.parse(this.chartData);
let colorArray : any = [];
    
    for(let item of inputData){
     this.Weeks.push("W"+ item.Weeks);
     this.Totals.push(item.Total );
     if(item.IsThresholdBreach){
      colorArray.push('#FF0000')
     }else {
      colorArray.push('#000000')
     }
    
    }
  
    
   
    
    this.data.labels = this.Weeks;

    this.data.datasets[0].data = this.Totals;
    this.data.datasets[0].backgroundColor = colorArray;
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
