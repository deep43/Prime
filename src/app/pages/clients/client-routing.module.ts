import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clients',
      status: false
    },
    children: [
      {
        path: 'clientdetails',
        data: {
          title: '',
          status: false
        },
        loadChildren: './client-details/client-details.module#ClientDetailsModule',
      },
      {
        path: 'clientlist',
        data: {
          title: '',
          status: false
        },
        loadChildren: './client-list/client-list.module#ClientListModule',
      },
      {
        path: 'createreport',
        data: {
          title: '',
          status: false
        },
        loadChildren: './create-report/create-report.module#CreateReportModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
