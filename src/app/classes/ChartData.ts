import { IBinanceCoin } from '../classes/Coins';

export class IBinanceCoinAdapter {
  label: string;
  data: any;
  constructor(coins: IBinanceCoin[]) {
    this.label = '';
    coins.forEach((coin) => {
      this.label = coin.symbol;
      this.data = coin.lastPrice;
    });
  }
}

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
  updateData(coins: IBinanceCoin[]) {
    let newCoins: string[] = [];
    coins.forEach((coin) => {
      newCoins.push(coin.symbol);
      if (!this.labels.includes(coin.symbol)) {
        this.labels.push(coin.symbol);
        this.data[coin.symbol] = [
          {
            name: coin.time.toString(),
            value: [coin.time.getTime(), coin.lastPrice],
          },
        ];
      } else {
        this.data[coin.symbol].push({
          name: coin.time.toString(),
          value: [coin.time.getTime(), coin.lastPrice],
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

  getSeries(): any[] {
    let series: any[] = [];
    this.labels.forEach((label) => {
      series.push({
        name: label,
        id: label,
        type: 'line',
        showSymbol: true,
        hoverAnimation: true,
        data: this.data[label],
      });
    });
    return series.slice();
  }
}
