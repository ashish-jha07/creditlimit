import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() update: any;
  @Input() chartData: any;
  @Input() text: any;
  labelsData: any = [];
  valueData: any = [];


  myChart: any;
  constructor(private elementRef: ElementRef, private util: UtilService) {
    Chart.register(...registerables);
  }
  ngOnChanges(): void {
    
    let inputData = JSON.parse(this.chartData);
    if (this.myChart) {
      this.removeData(this.myChart);
      for (let key in inputData) {
        this.addData(this.myChart, inputData[key].LimitTotalValue)
        // this.valueData.push();
      }

    } else {
      this.getchart(inputData);
    }


  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

  }
  addData(chart: any, data: any) {

    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(data);
    });
    chart.update();

  }
  removeData(chart: any) {

    chart.data.datasets.forEach((dataset: any) => {
      dataset.data = [];
    });
    chart.update();

  }
  getchart(inputData: any) {
    for (let key in inputData) {
      this.labelsData.push(inputData[key].LimitDescription);
      this.valueData.push(inputData[key].LimitTotalValue);
    }



    let data: any = {
      // labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [35, 35, 30],
          backgroundColor: Object.values({
            first: 'rgb(248, 102, 36, 100%)',
            second: 'rgb(67, 188, 205, 100%)',
            third: 'rgb(249, 200, 14, 100%)',

          }),
        }
      ]
    };
    let config: any = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
          
          title: {
            display: true,
            position: 'bottom',
            text: 'Existing'
          }
        }
      },
    };
    data.datasets[0].data = this.valueData;
    // this.data.labels = this.labelsData;
    data.datasets[0].backgroundColor = this.util.COLORS.slice(0, this.valueData.length);
    config.options.plugins.title.text = this.text
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.myChart = new Chart(htmlRef, config
    );
  }



}
