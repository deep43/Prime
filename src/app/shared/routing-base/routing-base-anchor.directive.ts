import { Directive, HostListener, Inject } from '@angular/core';

import { RoutingBaseLinkDirective } from './routing-base-link.directive';

@Directive({
  selector: '[appAccordionToggle]'
})
export class RoutingBaseAnchorDirective {

  protected navlink: RoutingBaseLinkDirective;

  constructor( @Inject(RoutingBaseLinkDirective) navlink: RoutingBaseLinkDirective) {
    this.navlink = navlink;
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.navlink.toggle();
  }
}
