import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportSentComponent} from './report-sent.component';

const routes: Routes = [
  {
    path: '',
    component: ReportSentComponent,
    data: {
      title: 'Reports Sent',
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
export class ReportSentRoutingModule { }
