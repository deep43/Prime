import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {PlainLayoutComponent} from './layout/plain-layout/plain-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'clients',
        loadChildren: './pages/clients/client.module#ClientModule'
      },
      {
        path: 'monitoring',
        loadChildren: './pages/monitoring/monitoring.module#MonitoringModule'
      },
      {
        path: 'aggregator',
        loadChildren: './pages/aggregator/aggregator.module#AggregatorModule'
      },
    ]
  },
  {
    path: '',
    component: PlainLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: './pages/login/basic-login.module#BasicLoginModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
