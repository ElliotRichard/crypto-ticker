import { Component, OnInit } from '@angular/core';

import { CryptoService, CryptoInterface } from '../../services/crypto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cryptoCoins: CryptoInterface[] = [];
  symbols: string[];

  constructor(private cryptoService: CryptoService) {
    this.symbols = cryptoService.get();
  }

  ngOnInit(): void {
    this.cryptoService.load(this.symbols).subscribe((cryptoCoins) => {
      this.cryptoCoins = cryptoCoins;
    });
  }
}
