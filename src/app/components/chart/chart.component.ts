import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartData } from '../../classes/ChartData';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() $coinData: any;
  private chartData: ChartData = new ChartData();
  options: any;
  updateOptions: any;
  constructor() {}

  ngOnInit(): void {
    if (this.$coinData) {
      this.chartData.updateData(this.$coinData);
    }
    // initialize chart options:
    this.options = {
      title: {
        text: 'Live Price',
      },
      legend: {
        show: true,
        valueAnimation: true,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          console.log('name', params.name);
          return (
            date.getDate() +
            '/' +
            date.getHours() +
            ':' +
            date.getMinutes() +
            ' | ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
        name: 'Time',
        scale: true,
        min: function (value: any) {
          console.log('min', value.min, 'max', value.max);
          // If there is data older than 5 min, only show last 5 minutes
          if (value.max - value.min > 300000) {
            return value.max - 300000;
          } else return value.min;
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
        name: 'Price ($NZD)',
        scale: true,
      },
      series: this.chartData.getSeries('line'),
    };
  }

  ngOnChanges() {
    this.chartData.updateData(this.$coinData);
    this.updateOptions = {
      series: this.chartData.getSeries('line'),
      legend: {
        data: this.chartData.getLabels(),
      },
    };
  }
}
