import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list.component';
import {ClientListRoutingModule} from './client-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AgGridModule} from 'ag-grid-angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClientListRoutingModule,
      SharedModule,
    ChartModule,
    FormsModule,
    NgxDatatableModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [ClientListComponent]
})
export class ClientListModule { }
