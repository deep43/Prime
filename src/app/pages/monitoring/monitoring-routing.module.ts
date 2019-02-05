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
        loadChildren: './daily/trading.module#TradingModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
