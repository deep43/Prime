import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {PlainLayoutComponent} from './layout/plain-layout/plain-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/app-pages/app-pages';
import {BreadcrumbsComponent} from './layout/main-layout/breadcrumbs/breadcrumbs.component';
import {CountoModule} from 'angular2-counto';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    PlainLayoutComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CountoModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [],
  providers: [MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule {
}
