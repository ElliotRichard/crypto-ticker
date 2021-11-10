const USD_TO_NZD = 1.39;

export class Coin {
  name: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  timeDataFrom: Date;
  constructor(
    name: string,
    price: number,
    priceChange: number,
    priceChangePercent: number,
    time: Date
  ) {
    this.name = name;
    this.price = price * USD_TO_NZD;
    this.priceChange = priceChange * USD_TO_NZD;
    this.priceChangePercent = priceChangePercent;
    this.timeDataFrom = time;
  }
}

export class CoinFactory {
  static makeCoinFromResponse(response: IBinanceResponse) {
    return new Coin(
      response.symbol,
      Number(response.lastPrice),
      Number(response.priceChange),
      Number(response.priceChangePercent),
      new Date()
    );
  }
}

export interface IBinanceResponse {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

/* export interface IBinanceCoin extends IBinanceResponse {
  time: Date;
}
 */
