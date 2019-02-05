import {Component} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {RefreshService} from '../../../../app/shared/service/refresh.service';

const today = new Date();
const ngbDateStruct = {day: today.getUTCDate(), month: today.getUTCMonth() + 1, year: today.getUTCFullYear()};

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
  ]
})
export class BreadcrumbsComponent {
  tempState = [];
  counter = 0;
  renderRefreshRow = false;
  renderReportRow = false;
  breadcrumbs: Array<Object>;
  copDate = ngbDateStruct;

  constructor(private router: Router, private route: ActivatedRoute, private refreshService: RefreshService) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.breadcrumbs = [];
        this.tempState = [];
        let currentRoute = this.route.root,
          url = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              const routeSnapshot = routes.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              if (routes.snapshot.data.title !== undefined) {
                let status = true;
                if (routes.snapshot.data.status !== undefined) {
                  status = routes.snapshot.data.status;
                }

                let icon = false;
                if (routes.snapshot.data.icon !== undefined) {
                  icon = routes.snapshot.data.icon;
                }

                let caption = false;
                if (routes.snapshot.data.caption !== undefined) {
                  caption = routes.snapshot.data.caption;
                }

                if (!this.tempState.includes(routes.snapshot.data.title)) {
                  this.tempState.push(routes.snapshot.data.title);
                  this.breadcrumbs.push({
                    label: routes.snapshot.data.title,
                    icon: icon,
                    caption: caption,
                    status: status,
                    url: url
                  });
                }
              }
              currentRoute = routes;
            }
          });
        } while (currentRoute);
        if (this.router.url === '/monitoring/daily') {
          this.renderRefreshRow = true;
        } else {
          this.renderRefreshRow = false;
        }

        if (this.router.url === '/clients/clientlist' || this.router.url === '/clients/clientdetails') {
          this.renderReportRow = true;
        } else {
          this.renderReportRow = false;
        }
      });
  }

  setRefreshCounters() {
    this.refreshService.setRefreshCounter(this.counter = this.counter ? 0 : 1);
  }
}
