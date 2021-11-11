import { Component, OnInit } from '@angular/core';

import { CryptoService, sortOption } from '../../services/crypto.service';
import { Coin } from '../../classes/Coins';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cryptoCoins: Coin[] = [];
  sortBy = sortOption.name;
  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.load().subscribe((cryptoCoins) => {
      // assigning to new array so change detection is picked up
      this.cryptoCoins = [...cryptoCoins];
    });
  }

  sortCoins(option: string) {
    switch (option) {
      case 'price':
        this.sortBy = sortOption.price;
        this.cryptoService.setSort(sortOption.price);
        break;
      case 'name':
        this.sortBy = sortOption.name;
        this.cryptoService.setSort(sortOption.name);
        break;
    }
  }
}
