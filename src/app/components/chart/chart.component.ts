import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartData } from '../../classes/ChartData';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() $coinData: any;
  @Input() sortBy: any;
  private chartData: ChartData = new ChartData();
  options: any;
  updateOptions: any;
  enableSeries: any = {};
  constructor() {}

  ngOnInit(): void {
    if (this.$coinData) {
      this.chartData.updateData(this.$coinData);
    }
    // initialize chart options:
    this.options = {
      legend: {
        show: true,
        valueAnimation: true,
        data: this.chartData.getLabels().sort((a, b) => a.localeCompare(b)),
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
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
        // name: 'Time',
        axisLabel: {
          formatter: (time: Date, index: any) => {
            return new Date(time).toLocaleTimeString(['en-nz', 'en-gb'], {
              hour12: true,
            });
          },
        },
        scale: true,
        min: (value: any) => {
          // If there is data older than 5 min, only show last 5 minutes
          if (value.max - value.min > 300000) {
            return value.max - 300000;
          } else return value.min;
        },
      },
      yAxis: {
        type: 'value',
        // boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
        scale: true,
      },
      axisLabel: {
        formatter: (price: any) => {
          return parseFloat(price).toLocaleString('en-nz', {
            style: 'currency',
            currency: 'NZD',
            currencyDisplay: 'narrowSymbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 10,
          });
        },
      },
      series: this.chartData.getSeries('line'),
    };
  }

  ngOnChanges() {
    this.chartData.updateData(this.$coinData);
    this.updateOptions = {
      series: this.chartData.getSeries('line'),
      legend: this.chartData.getLegend(this.sortBy),
    };
  }
}
