import { Component, OnInit } from '@angular/core';

import { CryptoService, CryptoInterface } from '../../services/crypto.service';
import { IBinanceCoin } from '../../classes/Coins';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cryptoCoins: IBinanceCoin[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.load().subscribe((cryptoCoins) => {
      // assigning to new array so change detection is picked up
      this.cryptoCoins = [...cryptoCoins];
    });
  }
}
