import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportChartRoutingModule } from './report-chart-routing.module';
import { ReportChartComponent } from './report-chart.component';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    ChartsModule,
    ReportChartRoutingModule
  ],
  declarations: [ReportChartComponent]
})
export class ReportChartModule { }
