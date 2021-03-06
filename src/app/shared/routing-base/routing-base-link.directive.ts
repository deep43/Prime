import {
  Directive, HostBinding, Inject, Input, OnInit, OnDestroy
} from '@angular/core';

import { RoutingBaseDirective } from './routing-base.directive';

@Directive({
  selector: '[appAccordionLink]'
})
export class RoutingBaseLinkDirective implements OnInit, OnDestroy {

  @Input() public group: any;

  @HostBinding('class.pcoded-trigger')
  @Input()
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    /*for slimscroll on and off*/
    document.querySelector('.pcoded-inner-navbar').classList.toggle('scroll-sidebar');
    if (value) {
        this.nav.closeOtherLinks(this);
    }
  }

  protected _open: boolean;
  protected nav: RoutingBaseDirective;

  constructor(@Inject(RoutingBaseDirective) nav: RoutingBaseDirective) {
    this.nav = nav;
  }

  ngOnInit(): any {
    this.nav.addLink(this);
  }

  ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  toggle(): any {
    /*for slimscroll on and off*/
    document.querySelector('.pcoded-inner-navbar').classList.add('scroll-sidebar');

    this.open = !this.open;
  }
}
