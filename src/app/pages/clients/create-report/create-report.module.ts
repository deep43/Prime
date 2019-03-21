import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {CreateReportComponent} from './create-report.component';
import {CreateReportRoutingModule} from './create-report-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CreateReportRoutingModule,
    SharedModule,
    FormsModule,
    ArchwizardModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [CreateReportComponent]
})
export class CreateReportModule {
}
