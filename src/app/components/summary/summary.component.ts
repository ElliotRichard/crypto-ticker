import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() crypto: any;
  constructor() {}

  ngOnInit(): void {}
  isNegative() {
    return this.crypto && this.crypto.priceChange < 0;
  }

  isPositive() {
    return this.crypto && this.crypto.priceChange > 0;
  }
}
