import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AggregatorTwoComponent} from './aggregator-two.component';

const routes: Routes = [
  {
    path: '',
    component: AggregatorTwoComponent,
    data: {
      title: 'Aggregator Two',
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
export class AggregatorTwoRoutingModule { }
