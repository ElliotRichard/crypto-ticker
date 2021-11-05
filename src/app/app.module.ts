import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageComponent } from './components/manage/manage.component';
import { SummaryComponent } from './components/summary/summary.component';
// Services
import { CryptoService } from './services/crypto.service';
// external
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DashboardComponent,
    ManageComponent,
    SummaryComponent,
  ],
  imports: [
    AutocompleteLibModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ReactiveFormsModule,
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
