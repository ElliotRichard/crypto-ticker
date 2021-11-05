import { Component, OnInit, Input } from '@angular/core';
import { IBinanceCoin } from 'src/app/classes/Coins';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() crypto: IBinanceCoin | any;
  constructor() {}

  ngOnInit(): void {}
  isNegative() {
    return this.crypto && Number(this.crypto.priceChange) < 0;
  }

  isPositive() {
    return this.crypto && Number(this.crypto.priceChange) > 0;
  }
}
