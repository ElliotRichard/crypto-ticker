import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartData } from '../../classes/ChartData';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() $coinData: any;
  options: any;
  updateOptions: any;
  private chartData: ChartData = new ChartData();
  constructor() {}

  ngOnInit(): void {
    this.chartData.updateData(this.$coinData);
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
        type: 'value',
        splitLine: {
          show: false,
        },
        name: 'Time',
        scale: true,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
        name: 'Price ($NZD)',
        scale: true,
        max: 90000,
      },
      series: this.chartData.getSeries(),
    };
  }

  ngOnChanges() {
    this.chartData.updateData(this.$coinData);
    this.updateOptions = {
      series: this.chartData.getSeries(),
      legend: {
        data: this.chartData.getLabels(),
      },
    };
  }
}
