import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';

declare const AmCharts: any;
declare var $: any;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/usaLow.js';
import '../../../../assets/charts/float/jquery.flot.js';
import '../../../../assets/charts/float/jquery.flot.categories.js';
import '../../../../assets/charts/float/curvedLines.js';
import '../../../../assets/charts/float/jquery.flot.tooltip.min.js';
import {current} from 'codelyzer/util/syntaxKind';
import {RefreshService} from '../../../shared/service/refresh.service';
import {Subscription} from 'rxjs';

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

  public chartOption: any = {
    legend: {
      show: false
    },
    series: {
      label: '',
      curvedLines: {
        active: true,
        nrSplinePoints: 20
      },
    },
    tooltip: {
      show: true,
      content: 'x : %x | y : %y'
    },
    grid: {
      hoverable: true,
      borderWidth: 0,
      labelMargin: 0,
      axisMargin: 0,
      minBorderMargin: 0,
    },
    yaxis: {
      min: 0,
      max: 30,
      color: 'transparent',
      font: {
        size: 0,
      }
    },
    xaxis: {
      color: 'transparent',
      font: {
        size: 0,
      }
    }
  };
  chartEcommerce: any;
  columns = [
    {name: 'Report Name', prop: 'Report_Name'},
    {name: 'Report Products', prop: 'Report_Products'},
    {name: 'Created By', prop: 'Created_By'},
    {name: 'Created Date', prop: 'Created_Date'},
    {name: 'Modified By', prop: 'Modified_By'},
    {name: 'Modified Date', prop: 'Modified_Date'},
  ];
  tradeColumns = [
    {name: 'Trading Enity', prop: 'Trading_Entity'},
    {name: 'Deal Ref No.', prop: 'Deal_No'},
    {name: 'Product', prop: 'Product'},
    {name: 'Buy Sell', prop: 'Buy_Sell'},
    {name: 'CCY Pair', prop: 'CCY_Pair'},
    {name: 'CCY Sold', prop: 'CCY_sold'},
    {name: 'Amount Sold', prop: 'Amt_sold'},
    {name: 'CCY Bought', prop: 'CCY_bought'},
    {name: 'Amount Bought', prop: 'Amt_bought'},
    {name: 'Trade date and Time', prop: 'Traded_On'},
    {name: 'Mature On', prop: 'Mature_on'},
    {name: 'Source', prop: 'SOURCE'},
    {name: 'Split Ref No', prop: 'Split_Ref_No'},
    {name: 'Invoice No', prop: 'Invoice_No'},
    {name: 'Beneficiary', prop: 'Beneficiary'},
  ];
  rowsFilter = [];
  tempFilter = [];
  rowsFilterTop = [];
  tempFilterTop = [];
  rowsTradeFilter = [];
  tempTradeFilter = [];
  currentTab = 1;
  tabs = [
    {number: 1, name: 'Overview', active: true},
    {number: 2, name: 'Schedule Reports', active: false},
    {number: 3, name: 'History', active: false},
    {number: 4, name: 'Data', active: false},
  ];

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

  /*rowData = [

    {version: '1.1', updatedBy: 'CDR', updatedDate: '', name: '', code: '',
      accountType: '', reportingName: '', baseCurrency: '', openDate: '', cdrID: '', leiIDy: '', activeFlag: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '12/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '18/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 57', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '27/May/2013', client: 'Client 59', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 60', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '12/May/2013', client: 'Client 60', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '03/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '11/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
  ];*/
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

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private refreshService: RefreshService) {
    this.appliedTheme = this.refreshService.getRefreshCounter().subscribe(theme => {
      this.appliedThemeClassOnTable = theme === 'dark' ? 'ag-theme-dark' : 'ag-theme-balham';
    });

    this.fetchFilterData((data) => {
      // cache our list
      this.tempFilter = [...data];
      this.tempFilterTop = [...data];

      // push our inital complete list
      this.rowsFilter = data;
      this.rowsFilterTop = data;
    });

    this.fetchTradeFilterData((data) => {
      // cache our list
      this.tempTradeFilter = [...data];

      // push our inital complete list
      this.rowsTradeFilter = data;
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
  // Prime Reporting functions
  changeTab(nextOrPrev) {
    switch (nextOrPrev) {
      case 'next':
        this.currentTab += 1;
        break;
      case 'prev':
        this.currentTab -= 1;
        break;
    }
    this.tabs = this.tabs.map((tab) => {
      if (this.currentTab === tab.number) {
        tab.active = true;
      } else {
        tab.active = false;
      }

      return tab;
    });

    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  // End Prime Rpprting functions

  onClickTab() {
    setTimeout(() => {
      this.chartEcommerce = AmCharts.makeChart('seo-ecommerce-barchart', {
        'type': 'serial',
        'theme': 'light',
        'marginTop': 0,
        'marginRight': 0,
        'dataProvider': [{
          'year': '1950',
          'value': -0.307
        }, {
          'year': '1951',
          'value': -0.168
        }, {
          'year': '1952',
          'value': -0.073
        }, {
          'year': '1953',
          'value': -0.027
        }, {
          'year': '1954',
          'value': -0.251
        }, {
          'year': '1955',
          'value': -0.281
        }, {
          'year': '1956',
          'value': -0.348
        }, {
          'year': '1957',
          'value': -0.074
        }, {
          'year': '1958',
          'value': -0.011
        }, {
          'year': '1959',
          'value': -0.074
        }, {
          'year': '1960',
          'value': -0.124
        }, {
          'year': '1961',
          'value': -0.024
        }, {
          'year': '1962',
          'value': -0.022
        }, {
          'year': '1963',
          'value': 0
        }, {
          'year': '1964',
          'value': -0.296
        }, {
          'year': '1965',
          'value': -0.217
        }, {
          'year': '1966',
          'value': -0.147
        }, {
          'year': '1967',
          'value': -0.15
        }, {
          'year': '1968',
          'value': -0.16
        }, {
          'year': '1969',
          'value': -0.011
        }, {
          'year': '1970',
          'value': -0.068
        }, {
          'year': '1971',
          'value': -0.19
        }, {
          'year': '1972',
          'value': -0.056
        }, {
          'year': '1973',
          'value': 0.077
        }, {
          'year': '1974',
          'value': -0.213
        }, {
          'year': '1975',
          'value': -0.17
        }, {
          'year': '1976',
          'value': -0.254
        }, {
          'year': '1977',
          'value': 0.019
        }, {
          'year': '1978',
          'value': -0.063
        }, {
          'year': '1979',
          'value': 0.05
        }, {
          'year': '1980',
          'value': 0.077
        }, {
          'year': '1981',
          'value': 0.12
        }, {
          'year': '1982',
          'value': 0.011
        }, {
          'year': '1983',
          'value': 0.177
        }, {
          'year': '1984',
          'value': -0.021
        }, {
          'year': '1985',
          'value': -0.037
        }, {
          'year': '1986',
          'value': 0.03
        }, {
          'year': '1987',
          'value': 0.179
        }, {
          'year': '1988',
          'value': 0.18
        }, {
          'year': '1989',
          'value': 0.104
        }, {
          'year': '1990',
          'value': 0.255
        }, {
          'year': '1991',
          'value': 0.21
        }, {
          'year': '1992',
          'value': 0.065
        }, {
          'year': '1993',
          'value': 0.11
        }, {
          'year': '1994',
          'value': 0.172
        }, {
          'year': '1995',
          'value': 0.269
        }, {
          'year': '1996',
          'value': 0.141
        }, {
          'year': '1997',
          'value': 0.353
        }, {
          'year': '1998',
          'value': 0.548
        }, {
          'year': '1999',
          'value': 0.298
        }, {
          'year': '2000',
          'value': 0.267
        }, {
          'year': '2001',
          'value': 0.411
        }, {
          'year': '2002',
          'value': 0.462
        }, {
          'year': '2003',
          'value': 0.47
        }, {
          'year': '2004',
          'value': 0.445
        }, {
          'year': '2005',
          'value': 0.47
        }],
        'valueAxes': [{
          'axisAlpha': 0,
          // 'gridAlpha': 0,
          'dashLength': 6,
          'position': 'left'
        }],
        'graphs': [{
          'id': 'g1',
          'balloonText': '[[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
          'bullet': 'round',
          'bulletSize': 8,
          // 'fillAlphas': 0.1,
          'lineColor': '#448aff',
          'lineThickness': 2,
          'negativeLineColor': '#ff5252',
          'type': 'smoothedLine',
          'valueField': 'value'
        }],
        'chartScrollbar': {
          'graph': 'g1',
          'gridAlpha': 0,
          'color': '#888888',
          'scrollbarHeight': 55,
          'backgroundAlpha': 0,
          'selectedBackgroundAlpha': 0.1,
          'selectedBackgroundColor': '#888888',
          'graphFillAlpha': 0,
          'autoGridCount': true,
          'selectedGraphFillAlpha': 0,
          'graphLineAlpha': 0.2,
          'graphLineColor': '#c2c2c2',
          'selectedGraphLineColor': '#888888',
          'selectedGraphLineAlpha': 1
        },
        'chartCursor': {
          'categoryBalloonDateFormat': 'YYYY',
          'cursorAlpha': 0,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'valueLineAlpha': 0.5,
          'fullWidth': true
        },
        'dataDateFormat': 'YYYY',
        'categoryField': 'year',
        'categoryAxis': {
          'minPeriod': 'YYYY',
          'gridAlpha': 0,
          'parseDates': true,
        },
      });
    }, 75);
  }

  getRowClass = (row) => {
    if (row.Status && row.Status.trim().toLocaleString() === 'settlement required') {
      console.log('hi');
    }
    return {
      'row-color': (row.Status && row.Status.trim().toLowerCase() === 'settlement required')
    };
  };

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempFilter.filter(function (d) {
      return d.Deal_No.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateFilterTop(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempFilterTop.filter(function (d) {
      return d.Deal_No.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilterTop = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  fetchFilterData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/blotter_data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
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
    setTimeout(() => {
      this.chartEcommerce = AmCharts.makeChart('seo-ecommerce-barchart', {
        'type': 'serial',
        'theme': 'light',
        'marginTop': 0,
        'marginRight': 0,
        'dataProvider': [{
          'year': '1950',
          'value': -0.307
        }, {
          'year': '1951',
          'value': -0.168
        }, {
          'year': '1952',
          'value': -0.073
        }, {
          'year': '1953',
          'value': -0.027
        }, {
          'year': '1954',
          'value': -0.251
        }, {
          'year': '1955',
          'value': -0.281
        }, {
          'year': '1956',
          'value': -0.348
        }, {
          'year': '1957',
          'value': -0.074
        }, {
          'year': '1958',
          'value': -0.011
        }, {
          'year': '1959',
          'value': -0.074
        }, {
          'year': '1960',
          'value': -0.124
        }, {
          'year': '1961',
          'value': -0.024
        }, {
          'year': '1962',
          'value': -0.022
        }, {
          'year': '1963',
          'value': 0
        }, {
          'year': '1964',
          'value': -0.296
        }, {
          'year': '1965',
          'value': -0.217
        }, {
          'year': '1966',
          'value': -0.147
        }, {
          'year': '1967',
          'value': -0.15
        }, {
          'year': '1968',
          'value': -0.16
        }, {
          'year': '1969',
          'value': -0.011
        }, {
          'year': '1970',
          'value': -0.068
        }, {
          'year': '1971',
          'value': -0.19
        }, {
          'year': '1972',
          'value': -0.056
        }, {
          'year': '1973',
          'value': 0.077
        }, {
          'year': '1974',
          'value': -0.213
        }, {
          'year': '1975',
          'value': -0.17
        }, {
          'year': '1976',
          'value': -0.254
        }, {
          'year': '1977',
          'value': 0.019
        }, {
          'year': '1978',
          'value': -0.063
        }, {
          'year': '1979',
          'value': 0.05
        }, {
          'year': '1980',
          'value': 0.077
        }, {
          'year': '1981',
          'value': 0.12
        }, {
          'year': '1982',
          'value': 0.011
        }, {
          'year': '1983',
          'value': 0.177
        }, {
          'year': '1984',
          'value': -0.021
        }, {
          'year': '1985',
          'value': -0.037
        }, {
          'year': '1986',
          'value': 0.03
        }, {
          'year': '1987',
          'value': 0.179
        }, {
          'year': '1988',
          'value': 0.18
        }, {
          'year': '1989',
          'value': 0.104
        }, {
          'year': '1990',
          'value': 0.255
        }, {
          'year': '1991',
          'value': 0.21
        }, {
          'year': '1992',
          'value': 0.065
        }, {
          'year': '1993',
          'value': 0.11
        }, {
          'year': '1994',
          'value': 0.172
        }, {
          'year': '1995',
          'value': 0.269
        }, {
          'year': '1996',
          'value': 0.141
        }, {
          'year': '1997',
          'value': 0.353
        }, {
          'year': '1998',
          'value': 0.548
        }, {
          'year': '1999',
          'value': 0.298
        }, {
          'year': '2000',
          'value': 0.267
        }, {
          'year': '2001',
          'value': 0.411
        }, {
          'year': '2002',
          'value': 0.462
        }, {
          'year': '2003',
          'value': 0.47
        }, {
          'year': '2004',
          'value': 0.445
        }, {
          'year': '2005',
          'value': 0.47
        }],
        'valueAxes': [{
          'axisAlpha': 0,
          // 'gridAlpha': 0,
          'dashLength': 6,
          'position': 'left'
        }],
        'graphs': [{
          'id': 'g1',
          'balloonText': '[[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
          'bullet': 'round',
          'bulletSize': 8,
          // 'fillAlphas': 0.1,
          'lineColor': '#448aff',
          'lineThickness': 2,
          'negativeLineColor': '#ff5252',
          'type': 'smoothedLine',
          'valueField': 'value'
        }],
        'chartScrollbar': {
          'graph': 'g1',
          'gridAlpha': 0,
          'color': '#888888',
          'scrollbarHeight': 55,
          'backgroundAlpha': 0,
          'selectedBackgroundAlpha': 0.1,
          'selectedBackgroundColor': '#888888',
          'graphFillAlpha': 0,
          'autoGridCount': true,
          'selectedGraphFillAlpha': 0,
          'graphLineAlpha': 0.2,
          'graphLineColor': '#c2c2c2',
          'selectedGraphLineColor': '#888888',
          'selectedGraphLineAlpha': 1
        },
        'chartCursor': {
          'categoryBalloonDateFormat': 'YYYY',
          'cursorAlpha': 0,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'valueLineAlpha': 0.5,
          'fullWidth': true
        },
        'dataDateFormat': 'YYYY',
        'categoryField': 'year',
        'categoryAxis': {
          'minPeriod': 'YYYY',
          'gridAlpha': 0,
          'parseDates': true,
        },
      });

      /*$.plot($('#seo-anlytics1'), [{
        data: [
          [0, 10],
          [1, 25],
          [2, 15],
          [3, 26],
          [4, 15],
          [5, 15],
          [6, 20],
          [7, 25],
          [8, 20],
          [9, 25],
          [10, 10],
          [11, 12],
          [12, 27],
          [13, 1],
        ],
        color: '#448aff',
        lines: {
          show: true,
          fill: false,
          lineWidth: 2
        },
        points: {
          show: true,
          radius: 3,
          fill: true,
          fillColor: '#448aff'
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#seo-anlytics2'), [{
        data: [
          [0, 10],
          [1, 15],
          [2, 25],
          [3, 15],
          [4, 26],
          [5, 20],
          [6, 15],
          [7, 20],
          [8, 25],
          [9, 10],
          [10, 25],
          [11, 27],
          [12, 12],
          [13, 1],
        ],
        color: '#9ccc65',
        lines: {
          show: true,
          fill: false,
          lineWidth: 2
        },
        points: {
          show: true,
          radius: 3,
          fill: true,
          fillColor: '#9ccc65'
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#seo-anlytics3'), [{
        data: [
          [0, 10],
          [1, 25],
          [2, 15],
          [3, 26],
          [4, 15],
          [5, 15],
          [6, 20],
          [7, 25],
          [8, 20],
          [9, 25],
          [10, 10],
          [11, 12],
          [12, 27],
          [13, 1],
        ],
        color: '#ff5252',
        lines: {
          show: true,
          fill: false,
          lineWidth: 2
        },
        points: {
          show: true,
          radius: 3,
          fill: true,
          fillColor: '#ff5252'
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#seo-anlytics4'), [{
        data: [
          [0, 10],
          [1, 15],
          [2, 25],
          [3, 15],
          [4, 26],
          [5, 20],
          [6, 15],
          [7, 20],
          [8, 25],
          [9, 10],
          [10, 25],
          [11, 27],
          [12, 12],
          [13, 1],
        ],
        color: '#ffba57',
        lines: {
          show: true,
          fill: false,
          lineWidth: 2
        },
        points: {
          show: true,
          radius: 3,
          fill: true,
          fillColor: '#ffba57'
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#sec-ecommerce-chart-line'), [{
        data: [
          [0, 1],
          [1, 27],
          [2, 15],
          [3, 25],
          [4, 10],
          [5, 20],
          [6, 15],
          [7, 25],
          [8, 10],
          [9, 25],
          [10, 15],
          [11, 27],
          [12, 12],
          [13, 1],
        ],
        color: '#fff',
        lines: {
          show: true,
          fill: false,
          lineWidth: 2
        },
        points: {
          show: true,
          radius: 3,
          fill: true,
          fillColor: '#fff'
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#sec-ecommerce-chart-bar'), [{
        data: [
          [0, 18],
          [1, 10],
          [2, 20],
          [3, 10],
          [4, 27],
          [5, 15],
          [6, 20],
          [7, 24],
          [8, 20],
          [9, 16],
          [10, 18],
          [11, 10],
          [12, 20],
          [13, 10],
          [14, 27],
        ],
        color: '#558B2F',
        bars: {
          show: true,
          lineWidth: 1,
          fill: true,
          fillColor: {
            colors: [{
              opacity: 1
            }, {
              opacity: 1
            }]
          },
          barWidth: 0.6,
          align: 'center',
          horizontal: false
        },
        points: {
          show: false
        },
      }], this.chartOption);

      $.plot($('#monthlyprofit-1'), [{
        data: [
          [0, 10],
          [1, 25],
          [2, 15],
          [3, 26],
          [4, 15],
          [5, 15],
          [6, 20],
          [7, 25],
          [8, 20],
          [9, 25],
          [10, 10],
          [11, 12],
          [12, 27],
          [13, 20],
          [14, 25],
          [15, 20],
          [16, 25],
          [17, 10],
          [18, 12],
          [19, 27],
          [20, 1],
        ],
        color: '#448aff',
        lines: {
          show: true,
          fill: true,
          lineWidth: 2
        },
        points: {
          show: true,
          radius: 2,
          fill: true,
          fillColor: '#448aff'
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#monthlyprofit-2'), [{
        data: [
          [0, 10],
          [1, 15],
          [2, 25],
          [3, 15],
          [4, 26],
          [5, 20],
          [6, 15],
          [7, 20],
          [8, 25],
          [9, 10],
          [10, 25],
          [11, 27],
          [12, 12],
          [13, 1],
        ],
        color: '#9ccc65',
        lines: {
          show: true,
          fill: true,
          lineWidth: 2
        },
        points: {
          show: true,
          radius: 2,
          fill: true,
          fillColor: '#9ccc65'
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);*/

    }, 75);
  }

}

