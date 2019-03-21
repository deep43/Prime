import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToggleFullScreenDirective} from './fullscreen/toggle-fullscreen.directive';
import {RoutingBaseAnchorDirective, RoutingBaseLinkDirective, RoutingBaseDirective} from './routing-base';
import {} from './routing-base/routing-base-link.directive';
import {} from './routing-base/routing-base.directive';
import {HttpClientModule} from '@angular/common/http';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {HeadingComponent} from '../layout/main-layout/heading/heading.component';
import {PrimeCardComponent} from './prime-card/prime-card.component';
import {PrimeCardToggleDirective} from './prime-card/prime-card-toggle.directive';
import {DialogComponent} from './dialog/dialog.component';
import {LineComponent} from './line-loader/line.component';
import {ClickOutsideModule} from 'ng-click-outside';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule
  ],
  exports: [
    NgbModule,
    ToggleFullScreenDirective,
    RoutingBaseAnchorDirective,
    RoutingBaseLinkDirective,
    RoutingBaseDirective,
    PrimeCardToggleDirective,
    HttpClientModule,
    PerfectScrollbarModule,
    HeadingComponent,
    PrimeCardComponent,
    DialogComponent,
    LineComponent,
    ClickOutsideModule,
  ],
  declarations: [
    ToggleFullScreenDirective,
    RoutingBaseAnchorDirective,
    RoutingBaseLinkDirective,
    RoutingBaseDirective,
    PrimeCardToggleDirective,
    HeadingComponent,
    PrimeCardComponent,
    DialogComponent,
    LineComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
