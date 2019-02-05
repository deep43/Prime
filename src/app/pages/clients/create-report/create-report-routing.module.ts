import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateReportComponent} from './create-report.component';

const routes: Routes = [
  {
    path: '',
    component: CreateReportComponent,
    data: {
      title: 'Create Report',
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
export class ClientListRoutingModule { }
