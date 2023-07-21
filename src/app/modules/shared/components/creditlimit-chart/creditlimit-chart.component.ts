import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UtilService } from 'src/app/core/services/util/util.service';
declare var google: any;
@Component({
  selector: 'app-creditlimit-chart',
  templateUrl: './creditlimit-chart.component.html',
  styleUrls: ['./creditlimit-chart.component.scss']
})
export class CreditlimitChartComponent implements OnInit {
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
  constructor(private elementRef: ElementRef, private util:UtilService) { }

  ngOnInit(): void {
  
  }
  ngOnChanges(): void{
    let inputData = JSON.parse(this.chartData);
    this.drowchartbyChartjs(inputData);
 //   this.drowchart(inputData);
  }
  drowchartbyChartjs(inputData: any){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myCharta`);
    
    let data: any = {
      labels: [],
      datasets: [
        {
          label: '%',
          data: [],
          borderColor: '#FFCC00',
          borderWidth: 0.5,
          backgroundColor: '#FFCC00',
          yAxisID: 'y1',
          stack: 'combined',
          // pointStyle: 'circle',
          // pointRadius: 10,
          // pointHoverRadius: 15,
        },
        {
          label: 'Limit',
          data: [], 
          borderColor: '#000',
          backgroundColor:'#000',
         // stack: 'combined',
          yAxisID: 'y',
          type: 'bar'
        },{
          label: 'Utilization',
          data: [],
          borderColor: '#1428A0',
          backgroundColor:'#1428A0',
       //   stack: 'combined',
          yAxisID: 'y',
          type: 'bar'
        },
        
      ]
    };
    let that = this;
    let config : any = {
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
                size: 6,
               // weight: ""
              },
             // color: 'red',
         
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
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
          }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            ticks: {
              font: {
                size: 10,
               // weight: ""
              },
              // Include a dollar sign in the ticks
              callback: function(value: any, index: any, ticks: any) {
                  return  value + '%';
              }
          }
          },
        }
      },
    };
    for(let item of inputData){
      //  let a : any = that.labels[item.Months-1];
      //  let datarow: any = [that.labels[item.Months-1], item.Limit, item.Utilization, item.UtilizationPercentage];
        
        data.labels.push(this.labels[item.Months-1] +'.' +item.Years) ;
        data.datasets[0].data.push(item.UtilizationPercentage) ;
        data.datasets[1].data.push(item.Limit) ;
       // data.datasets[2].data.push(item.Utilization +2000000) ;
        data.datasets[2].data.push(item.Utilization ) ;
      }
    const myChart = new Chart(htmlRef, config
    );
  }
  drowchart(inputData: any){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawVisualization);
let that = this;
    function drawVisualization() {
      // Some raw data (not necessarily accurate)
      let data = new google.visualization.DataTable(); 
      
      // .arrayToDataTable([
      //   ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
      //   ['2004/05',  165,      938,         522,             998,           450,      614.6],
      //   ['2005/06',  135,      1120,        599,             1268,          288,      682],
      //   ['2006/07',  157,      1167,        587,             807,           397,      623],
      //   ['2007/08',  139,      1110,        615,             968,           215,      609.4],
      //   ['2008/09',  136,      691,         629,             1026,          366,      569.6]
      // ]);

      data.addColumn('string', 'Month');
      data.addColumn('number', 'Limit');
      data.addColumn('number', 'Utilization');
      data.addColumn('number', '%');
      for(let item of inputData){
      //  let a : any = that.labels[item.Months-1];
        let datarow: any = [that.labels[item.Months-1], item.Limit, item.Utilization, item.UtilizationPercentage];
        
        data.addRow(datarow);   
      }
      var options = {
       // legend: 'none',
       // title : 'Monthly Coffee Production by Country',
       // vAxis: {title: 'Cups'},
        hAxis: {title: 'Month'},
        seriesType: 'bars',
        series: {3: {type: 'line'}}
      };

      var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  }

}
