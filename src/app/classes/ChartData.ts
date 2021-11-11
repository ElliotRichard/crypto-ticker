import { Coin } from '../classes/Coins';
import { sortOption } from '../services/crypto.service';

export interface chartDatum {
  name: string;
  value: any[];
}

export class ChartData {
  private labels: string[] = [];
  private remove: string[] = [];
  private data: { [key: string]: chartDatum[] } = {};
  constructor() {}

  private _getRemoved() {
    let labels = this.remove.slice();
    this.remove = [];
    return labels;
  }

  getLabels(): string[] {
    return this.labels.slice();
  }

  getLegend(sortBy: sortOption): {} {
    let legend: any = {};
    let labels: any = {};
    let show: any = {};
    switch (sortBy) {
      case sortOption.name:
        labels = this.getLabels().sort((a, b) => a.localeCompare(b));
        break;
      case sortOption.price:
        labels = this.getLabels().sort((a, b) => {
          return (
            this.data[b][this.data[b].length - 1].value[1] -
            this.data[a][this.data[a].length - 1].value[1]
          );
        });
    }
    this._getRemoved().forEach((label) => {
      show[label] = false;
    });
    legend.selected = show;
    legend.data = labels;
    return legend;
  }

  getSeries(seriesType: string): any[] {
    let series: any[] = [];
    this.labels.forEach((label) => {
      series.push({
        name: label,
        id: label,
        type: seriesType,
        showname: true,
        showSymbol: false,
        hoverAnimation: true,
        data: this.data[label],
        sampling: 'lttb',
      });
    });
    return series.slice();
  }

  updateData(coins: Coin[]) {
    let newCoins: string[] = [];
    coins.forEach((coin) => {
      newCoins.push(coin.name);
      if (!this.labels.includes(coin.name)) {
        this.labels.push(coin.name);
        this.data[coin.name] = [
          {
            name: coin.timeDataFrom.toString(),
            value: [coin.timeDataFrom.getTime(), coin.price],
          },
        ];
      } else {
        this.data[coin.name].push({
          name: coin.timeDataFrom.toString(),
          value: [coin.timeDataFrom.getTime(), coin.price],
        });
      }
    });
    this.labels.forEach((label) => {
      if (!newCoins.includes(label)) {
        this.labels.splice(this.labels.indexOf(label), 1);
        this.remove.push(label);
        delete this.data[label];
      }
    });
  }
}
