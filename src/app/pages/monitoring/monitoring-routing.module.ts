import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Daily Monitoring',
      status: false
    },
    children: [
      {
        path: 'daily',
        data: {
          title: '',
          status: false
        },
        loadChildren: './reports-pending/report-pending.module#ReportPendingModule',
      },
      {
        path: 'charts',
        data: {
          title: '',
          status: false
        },
        loadChildren: './reports-chart/report-chart.module#ReportChartModule',
      },
      {
        path: 'sent',
        data: {
          title: '',
          status: false
        },
        loadChildren: './reports-sent/report-sent.module#ReportSentModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
