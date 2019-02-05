import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TradingComponent} from './trading.component';
import {TradingRoutingModule} from './trading-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {AgmCoreModule} from '@agm/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {DragulaModule} from 'ng2-dragula';
import {CountoModule} from 'angular2-counto';
import {ProgressBarModule} from 'angular-progress-bar';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {NgProgressModule} from 'ngx-progressbar';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    CountoModule,
    ProgressBarModule,
    NgProgressModule,
    TradingRoutingModule,
    SharedModule,
    ChartModule,
    NgxDatatableModule,
    TextMaskModule,
    FormsModule,
    CurrencyMaskModule,
    DragulaModule,
    ToastyModule,
    Ng2GoogleChartsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    AgGridModule.withComponents([]),
  ],
  declarations: [TradingComponent]
})
export class TradingModule {
}
