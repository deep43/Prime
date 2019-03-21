import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Aggregator',
      status: false
    },
    children: [
      {
        path: 'aggregatorone',
        data: {
          title: '',
          status: false
        },
        loadChildren: './aggregator-one/aggregator-one.module#AggregatorOneModule',
      },
      {
        path: 'aggregatortwo',
        data: {
          title: '',
          status: false
        },
        loadChildren: './aggregator-two/aggregator-two.module#AggregatorTwoModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregatorRoutingModule { }
