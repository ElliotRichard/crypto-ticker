import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import {
  Observable,
  of,
  forkJoin,
  timer,
  interval,
  from,
  empty,
  Subject,
} from 'rxjs';
import {
  tap,
  mergeMap,
  map,
  delay,
  repeat,
  expand,
  throttleTime,
  debounceTime,
  repeatWhen,
} from 'rxjs/operators';

import { CoinFactory, Coin, IBinanceResponse } from '../classes/Coins';

let cryptoCoins: string[] = [
  'BTCUSDT',
  'ETHUSDT',
  'SHIBUSDT',
  'BUSDUSDT',
  'DOGEUSDT',
];
let service: string = 'https://api2.binance.com/api/v3';
export enum sortOption {
  price,
  name,
}
export interface CryptoInterface {
  symbol: string;
  lastPrice: number;
  priceChange: number;
  priceChangePercent: number;
}

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private sortBy: sortOption = sortOption.name;
  constructor(private http: HttpClient) {}

  /**
   * Returns a copy of stocks so that they are not directly modified.
   * @returns A copy of stocks
   */
  get(): string[] {
    return cryptoCoins.slice();
  }

  /**
   * Adds a crypto coin to the list to be watched.
   * @param crypto The coin to add
   * @returns the updated lists of coins
   */
  add(crypto: string) {
    cryptoCoins.push(crypto);
    return this.get();
  }

  /**
   * Removes a coin from the list being watched.
   * @param crypto the coin being removed
   * @returns the updated list of coins
   */
  remove(crypto: any): string[] {
    cryptoCoins.splice(cryptoCoins.indexOf(crypto), 1);
    return this.get();
  }

  /**
   * Repeatedly requests the current price of the coins from the free Binance API.
   * @param symbols coins being requested
   * @returns the data as an observable
   */
  load(): Observable<Coin[]> {
    let repeatStatus: number | undefined = undefined;
    return of(cryptoCoins).pipe(
      repeatWhen((_) => _.pipe(delay(2000), repeat(repeatStatus))),
      mergeMap((symbols) => {
        const requestArrays = symbols.map((symbol) => {
          return this.http
            .get<HttpResponse<any>>(service + '/ticker/24hr?symbol=' + symbol, {
              observe: 'response',
            })
            .pipe(
              tap((response: HttpResponse<any>) => {
                // 429 means the rate limit is reached
                if (response.status === 429) {
                  repeatStatus = 0;
                }
              }),
              map((response: HttpResponse<any>) => {
                return CoinFactory.makeCoinFromResponse(
                  response.body as IBinanceResponse
                );
              })
            );
        });
        return forkJoin(requestArrays);
      }),
      map((coins: Coin[]) => {
        return this._sort(coins);
      })
    );
  }

  setSort(option: sortOption) {
    this.sortBy = option;
  }

  getSort() {
    return this.sortBy;
  }

  private _sort(coins: Coin[]): Coin[] {
    switch (this.sortBy) {
      case sortOption.name:
        coins.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case sortOption.price:
        coins.sort((a, b) => b.price - a.price);
        break;
    }
    return coins;
  }
}
