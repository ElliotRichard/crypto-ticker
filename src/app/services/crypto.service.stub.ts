import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MockCryptoList, MockCryptoResponse } from './crypto.mock';
import { CryptoService } from './crypto.service';

export class StubCryptoService extends CryptoService {
  constructor() {
    super({} as HttpClient);
  }

  load() {
    return of(MockCryptoResponse);
  }
}
