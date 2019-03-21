import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportPendingComponent} from './report-pending.component';

const routes: Routes = [
  {
    path: '',
    component: ReportPendingComponent,
    data: {
      title: 'Reports Pending',
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
export class ReportPendingRoutingModule { }
