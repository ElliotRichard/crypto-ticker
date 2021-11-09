import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { MockCryptoResponse } from '../../services/crypto.mock';
import { IBinanceCoin } from 'src/app/classes/Coins';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    let mockCryptoCoins: IBinanceCoin[] = [];
    MockCryptoResponse.forEach((response) => {
      let newCoin = response;
      newCoin.time = new Date();
      mockCryptoCoins.push(newCoin);
    });
    component.$coinData = mockCryptoCoins;
    expect(component).toBeTruthy();
  });
});
