import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';

import {RefreshService} from '../../../shared/service/refresh.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './client-details.component.html',
  styleUrls: [
    './client-details.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
  ]
})
export class ClientDetailsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  columnDefs = [
    {
      headerName: 'Report Name', field: 'reportName',
      filter: true, resizable: true, suppressMovable: true,
    },
    {
      headerName: 'Report Products', field: 'reportProducts', filter: true, resizable: true, suppressMovable: true,
    },
    {
      headerName: 'Created By', field: 'createdBy', filter: true, suppressMovable: true,
    },
    {
      headerName: 'Created Date', field: 'createdDate', filter: true, suppressMovable: true,
    },
    {
      headerName: 'Modified By', field: 'modifiedBy', filter: true, resizable: true, suppressMovable: true,
    },
    {
      headerName: 'Modified Date', field: 'modifiedDate', filter: true, resizable: true, suppressMovable: true,
    },
  ];
  rowData = [
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - Test', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - test', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
    {
      reportName: 'New Report - My new one', reportProducts: 'FX Stock', createdBy: 'anonymous', createdDate: '05-Oct-18',
      modifiedBy: 'anonymous', modifiedDate: '05-Oct-18'
    },
  ];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  appliedTheme: Subscription;
  appliedThemeClassOnTable = 'ag-theme-balham';


  constructor(private router: Router, private route: ActivatedRoute, private refreshService: RefreshService) {
    this.appliedTheme = this.refreshService.getObservableTheme().subscribe(theme => {
      this.appliedThemeClassOnTable = theme === 'dark' ? 'ag-theme-dark' : 'ag-theme-balham';
    });

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.appliedThemeClassOnTable = this.refreshService.getTheme() === 'dark' ? 'ag-theme-dark' : 'ag-theme-balham';
      });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() { }

}

