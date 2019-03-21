import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportChartComponent} from './report-chart.component';

const routes: Routes = [
  {
    path: '',
    component: ReportChartComponent,
    data: {
      title: 'Reports Chart',
      icon: 'icon-home',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportChartRoutingModule { }
