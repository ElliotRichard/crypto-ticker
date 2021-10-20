import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { FormControl } from '@angular/forms';
import { symbolList } from '../../../symbolList';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  data = symbolList;
  currentSearch: string[] = [];
  keyword = '';
  symbols: string[];
  crypto: string = '';
  autoComplete = new FormControl();
  constructor(private cryptoService: CryptoService) {
    this.symbols = cryptoService.get();
  }

  ngOnInit() {
    this.autoComplete.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value.length >= 2) {
          let foundVal = this._filter(value);
          console.log(`FoundVal: ${foundVal}`);
        }
      })
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return symbolList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  add() {
    this.symbols = this.cryptoService.add(this.crypto.toUpperCase());
    this.crypto = '';
  }

  remove(symbol: any) {
    this.symbols = this.cryptoService.remove(symbol);
  }

  selectEvent($event: any) {
    console.log(`Selected: ${$event}, ${this.keyword}`);
    this.crypto = $event;
    this.add();
  }

  onChangeSearch($event: any) {
    if ($event.length > 0) {
      this.currentSearch = this.data.slice().filter((value) => {
        return value.toLowerCase().includes($event.toLowerCase());
      });
      this.keyword = $event;
    } else if ($event.length === 0) {
      this.keyword = '';
      this.currentSearch = [];
    }
    console.log(`Change Searching ${$event}`);
  }
  onFocused($event: any) {
    console.log(`onFocused ${$event}`);
  }
}
