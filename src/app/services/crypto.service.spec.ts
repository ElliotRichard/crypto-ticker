import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CryptoService } from './crypto.service';
import { IBinanceResponse } from '../classes/Coins';
import { MockCryptoList, MockCryptoResponse } from './crypto.mock';

describe('CryptoService', () => {
  const baseUrl = 'https://api2.binance.com/api/v3';
  let service: CryptoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CryptoService],
    });
    service = TestBed.inject(CryptoService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
  });

  it('should instantiate', () => {
    expect(service).toBeTruthy();
  });

  it('should manage a list of cryptos', () => {
    expect(service.get()).toContain('BTCUSDT');
    service.add('TEST');
    expect(service.get()).toEqual([...MockCryptoList, 'TEST']);
    service.remove('TEST');
    expect(service.get()).toEqual(MockCryptoList);
  });

  it('should load crypto data from API', (done) => {
    service.load().subscribe((result) => {
      expect(result).toEqual(MockCryptoResponse);
      done();
    });
    const request = http.expectOne(
      baseUrl + '/ticker/24hr?symbol=' + MockCryptoList.join(',')
    );
    request.flush(MockCryptoResponse);
  });
});
