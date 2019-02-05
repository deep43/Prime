import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientDetailsComponent} from './client-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDetailsComponent,
    data: {
      title: 'Goldman Sachs',
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
export class ClientDetailsRoutingModule { }
