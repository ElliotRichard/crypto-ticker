import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { from, Observable, of, forkJoin } from 'rxjs';
import { tap, mergeMap, map, delay, repeat } from 'rxjs/operators';

let cryptoCoins: string[] = [
  'BTCUSDT',
  'ETHUSDT',
  'SHIBUSDT',
  'BUSDUSDT',
  'DOGEUSDT',
];

let service: string = 'https://api2.binance.com/api/v3';
let availableCryptoCoins: string[] = [];
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
   * Returns a copy of stocks so that they are not directly modified
   * @returns A copy of stocks
   */
  get(): string[] {
    return cryptoCoins.slice();
  }

  add(crypto: string) {
    cryptoCoins.push(crypto);
    return this.get();
  }

  remove(crypto: any): string[] {
    cryptoCoins.splice(cryptoCoins.indexOf(crypto), 1);
    return this.get();
  }

  load(symbols: string[]): Observable<any> {
    let repeatStatus = undefined;
    if (symbols) {
      return of(symbols).pipe(
        delay(10000),
        repeat(repeatStatus),
        mergeMap((symbols) => {
          const requestArrays = symbols.map((symbol) => {
            return this.http
              .get(service + '/ticker/24hr?symbol=' + symbol, {
                observe: 'response',
              })
              .pipe(
                tap((response: HttpResponse<any>) => {
                  if (response.status === 429) {
                    repeatStatus = 0;
                  }
                }),
                map((response) => {
                  return response.body;
                })
              );
          });
          return forkJoin(requestArrays);
        })
      );
    } else return from('Error loading crypto prices');
  }
}
