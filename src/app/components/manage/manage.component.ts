import { Component } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';
import { symbolList } from '../../../symbolList';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent {
  data = symbolList;
  currentSearch: string[] = [];
  keyword = '';
  symbols: string[];
  crypto: string = '';

  constructor(private cryptoService: CryptoService) {
    this.symbols = cryptoService.get();
  }

  add() {
    this.symbols = this.cryptoService.add(this.crypto.toUpperCase());
    this.crypto = '';
  }

  remove(symbol: any) {
    this.symbols = this.cryptoService.remove(symbol);
  }

  selectEvent($event: any) {
    this.crypto = $event;
    this.add();
  }

  onChangeSearch($event: any) {
    if ($event.length > 1) {
      this.currentSearch = this.data.slice().filter((value) => {
        return value.toLowerCase().includes($event.toLowerCase());
      });
      this.keyword = $event;
    } else if ($event.length === 0) {
      this.keyword = '';
      this.currentSearch = [];
    }
  }
}
