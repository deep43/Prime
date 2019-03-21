import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';

import {RefreshService} from '../../../shared/service/refresh.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './client-list.component.html',
  styleUrls: [
    './client-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
  ]
})
export class ClientListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  columnDefs = [
    {
      headerName: 'Version', field: 'version',
      filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Updated By', field: 'updatedBy', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Updated Date', field: 'updatedDate', filter: true, suppressMovable: true
    },
    {
      headerName: 'Name', field: 'name', filter: true, suppressMovable: true, width: 340,
      cellRenderer: (params) => {
        return '<a href="#/clients/clientdetails"><span class="client-link">'
          + params.getValue() + '</span></a>';
      }
    },
    {
      headerName: 'Code', field: 'code', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Account Type', field: 'accountType', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Reporting Name', field: 'reportingName', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Base Currency', field: 'baseCurrency', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Open Date', field: 'openDate', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Close Date', field: 'closeDate', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'CDR ID', field: 'cdrID', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'LEI ID', field: 'leiIDy', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Active Flag', field: 'activeFlag', filter: true, resizable: true, suppressMovable: true
    },
  ];
  rowData = [

    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },

    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },

    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },

    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },

    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
    {
      version: '1.1', updatedBy: 'CDR', updatedDate: '05-Oct-18', name: 'Goldman Sachs',
      code: 'GLDMNSCHS', accountType: 'Counterparty', reportingName: 'Goldman Sachs', baseCurrency: 'USD',
      openDate: '1-OCT-18', closeDate: '', cdrID: 'CDR001', leiIDy: 'LEI001', activeFlag: 'Y'
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApi;
  gridColumnApi;
  selectedRowsPerPage = 20;
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onPageSizeChanged(newPageSize) {
    const value = this.selectedRowsPerPage; // document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  }


  fetchTradeFilterData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/trade_search_data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  ngOnInit() {
  }

}

