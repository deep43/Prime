import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-title',
  template: '<span></span>'
})
export class HeadingComponent {
  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        let currentRoute = this.route.root;
        let title = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              title = routes.snapshot.data.title;
              currentRoute = routes;
            }
          });
        } while (currentRoute);
        if (title !== undefined ) {
          this.titleService.setTitle(title + ' | prime Demo');
        }
      });
  }
}