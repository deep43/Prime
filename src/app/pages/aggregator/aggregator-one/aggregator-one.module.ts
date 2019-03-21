import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AggregatorOneComponent} from './aggregator-one.component';
import {AggregatorOneRoutingModule} from './aggregator-one-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {AgmCoreModule} from '@agm/core';
import {FormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {CountoModule} from 'angular2-counto';
import {ProgressBarModule} from 'angular-progress-bar';
import {NgProgressModule} from 'ngx-progressbar';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    CountoModule,
    ProgressBarModule,
    NgProgressModule,
    AggregatorOneRoutingModule,
    SharedModule,
    ChartModule,
    FormsModule,
    ToastyModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    AgGridModule.withComponents([]),
  ],
  declarations: [AggregatorOneComponent]
})
export class AggregatorOneModule {
}
