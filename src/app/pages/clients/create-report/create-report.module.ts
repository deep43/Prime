import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { CreateReportComponent } from './create-report.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ArchwizardModule,
  ],
  declarations: [CreateReportComponent]
})
export class CreateReportModule { }
