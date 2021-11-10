import { Coin } from '../classes/Coins';

export interface chartDatum {
  name: string;
  value: any[];
}

export class ChartData {
  private labels: string[] = [];
  private data: { [key: string]: chartDatum[] } = {};
  constructor() {}

  getLabels() {
    return this.labels.slice();
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
        delete this.data[label];
      }
    });
  }

  getSeries(seriesType: string): any[] {
    let series: any[] = [];
    this.labels.forEach((label) => {
      series.push({
        name: label,
        id: label,
        type: seriesType,
        showname: true,
        hoverAnimation: true,
        data: this.data[label],
        sampling: 'lttb',
      });
    });
    return series.slice();
  }
}
