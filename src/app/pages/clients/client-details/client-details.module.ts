import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsComponent } from './client-details.component';
import {ClientDetailsRoutingModule} from './client-details-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    ClientDetailsRoutingModule,
    SharedModule,
    ChartModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [ClientDetailsComponent]
})
export class ClientDetailsModule { }
