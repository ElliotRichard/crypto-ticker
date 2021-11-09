import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, mergeMap, map, delay, repeat } from 'rxjs/operators';

import { IBinanceCoin } from '../classes/Coins';

let cryptoCoins: string[] = [
  'BTCUSDT',
  'ETHUSDT',
  'SHIBUSDT',
  'BUSDUSDT',
  'DOGEUSDT',
];
let service: string = 'https://api2.binance.com/api/v3';

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
  load(): Observable<IBinanceCoin[]> {
    let repeatStatus = undefined;
    return of(cryptoCoins).pipe(
      delay(3000),
      repeat(repeatStatus),
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
                response.body.time = new Date();
                return response.body as IBinanceCoin;
              })
            );
        });
        return forkJoin(requestArrays);
      })
    );
  }
}
