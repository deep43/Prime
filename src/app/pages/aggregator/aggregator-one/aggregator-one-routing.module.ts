import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AggregatorOneComponent} from './aggregator-one.component';

const routes: Routes = [
  {
    path: '',
    component: AggregatorOneComponent,
    data: {
      title: 'Aggregator One',
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
export class AggregatorOneRoutingModule { }
