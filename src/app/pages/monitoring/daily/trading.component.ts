import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import 'd3';
import * as c3 from 'c3';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {createNumberMask} from 'text-mask-addons/dist/textMaskAddons';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {RefreshService} from '../../../shared/service/refresh.service';
import {Subscription} from 'rxjs';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';

declare var $: any;
declare const AmCharts: any;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/usaLow.js';


import '../../../../assets/charts/float/jquery.flot.js';
import '../../../../assets/charts/float/jquery.flot.categories.js';
import '../../../../assets/charts/float/curvedLines.js';
import '../../../../assets/charts/float/jquery.flot.tooltip.min.js';
import '../../../../assets/charts/float/jquery.flot.tooltip.min.js';
import {el} from '@angular/platform-browser/testing/src/browser_util';

const today = new Date();
const ngbDateStruct = {day: today.getUTCDate(), month: today.getUTCMonth() + 1, year: today.getUTCFullYear()};
const USDTradeRate = 1.135;
const EURTradeRate = 0.8812;
const confirmButton = {
  confirm: 'Confirm',
  settlement: 'Confirm & Settle',
};
const accounts = 'Accounts';

class Card {
  onPlusClick: boolean;
  onRequestClick: boolean;
  maturityDateType: string;
  buySellType: string;
  ccySold: string;
  amountSold: number;
  product: string;
  ccyPair: string;
  maturityDate: NgbDateStruct;
  tradeDate: string;
  tradeRate: number;
  tradeRateSmall: string;
  tradeRateLarge: string;
  status: string;
  calculatedTrade: number;

  getCalculatedTrade() {
    let calculatedTrade;
    if (this.ccyPair === 'USDEUR') { // when it is USD/EUR
      if (this.ccySold === 'USD') {
        calculatedTrade = this.amountSold * EURTradeRate;
      }
      if (this.ccySold === 'EUR') {
        calculatedTrade = this.amountSold / EURTradeRate;
      }
    } else if (this.ccyPair === 'EURUSD') { // when it is EUR/USD
      if (this.ccySold === 'USD') {
        calculatedTrade = this.amountSold / USDTradeRate;
      }
      if (this.ccySold === 'EUR') {
        calculatedTrade = this.amountSold * USDTradeRate;
      }
    }

    return Math.round(calculatedTrade * 100) / 100;
  }

  getTradeRates(tradeRate) {
    const stringTradeRate = tradeRate.toString();
    const tradeRateLarge = stringTradeRate.slice(-2);
    return {
      tradeRateLarge,
      tradeRateSmall: stringTradeRate.slice(0, stringTradeRate.indexOf(tradeRateLarge)),
    };
  }

  constructor(onPlusClick = false, onRequestClick = false, maturityDateType = 'O',
              buySellType = 'B', ccySold = 'EUR', amountSold = 20000, product = 'Spot',
              ccyPair = 'USDEUR', maturityDate = ngbDateStruct, tradeDate = '',
              status = 'Settlement Required', tradeRate = EURTradeRate) {
    const {tradeRateSmall, tradeRateLarge} = this.getTradeRates(tradeRate);
    this.onPlusClick = onPlusClick;
    this.onRequestClick = onRequestClick;
    this.maturityDateType = maturityDateType;
    this.buySellType = buySellType;
    this.ccySold = ccySold;
    this.amountSold = amountSold;
    this.product = product;
    this.ccyPair = ccyPair;
    this.maturityDate = maturityDate;
    this.tradeDate = tradeDate;
    this.tradeRate = tradeRate;
    this.tradeRateSmall = tradeRateSmall;
    this.tradeRateLarge = tradeRateLarge;
    this.status = status;
    this.calculatedTrade = this.getCalculatedTrade();
  }
}


@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './trading.component.html',
  styleUrls: [
    '../../../../../node_modules/ng2-toasty/style-bootstrap.css',
    '../../../../../node_modules/ng2-toasty/style-default.css',
    '../../../../../node_modules/ng2-toasty/style-material.css',
    './trading.component.scss',
    '../../../../../node_modules/c3/c3.min.css',
    '../../../../../node_modules/dragula/dist/dragula.css',
    '../../../../assets/icon/icofont/css/icofont.scss',
  ],
  encapsulation: ViewEncapsulation.None
})

export class TradingComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  public maskUsAmountDecimal = createNumberMask({
    prefix: '',
    suffix: '',
    allowDecimal: true
  });
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  chartEcommerce: any;
  dealNo = '2018112814807';
  selectedDebitAccount = accounts;
  selectedCreditAccount = accounts;
  confirmButtonText = 'Confirm';
  plusClicked = false;
  buySellData = [
    new Card(),
    new Card(),
  ];

  selectedCard: Card;
  startDate: any;
  startMonth: any;
  startYear: any;
  endDate: any;
  endMonth: any;
  endYear: any;
  columns = [
    {name: 'Name', prop: 'Name'},
    {name: 'Status', prop: 'Status'},
    {name: 'Region', prop: 'Region'},
    {name: 'Start', prop: 'Start'},
    {name: 'End', prop: 'End'},
    {name: 'Progress', prop: 'Progress'},
    {name: 'Duration(hh:mm:ss)', prop: 'Duration'}
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
  tradeDate: string;
  tradeDateTime: any;
  rowsFilter = [];
  tempFilter = [];
  settlementClass: 'settlement';
  rowsTradeFilter = [];
  tempTradeFilter = [];

  /*Bar chart Start*/
  type1 = 'bar';
  data1 = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: [
        'rgba(95, 190, 170, 0.99)',
        'rgba(95, 190, 170, 0.99)',
        'rgba(95, 190, 170, 0.99)',
        'rgba(95, 190, 170, 0.99)',
        'rgba(95, 190, 170, 0.99)',
        'rgba(95, 190, 170, 0.99)',
        'rgba(95, 190, 170, 0.99)'
      ],
      hoverBackgroundColor: [
        'rgba(26, 188, 156, 0.88)',
        'rgba(26, 188, 156, 0.88)',
        'rgba(26, 188, 156, 0.88)',
        'rgba(26, 188, 156, 0.88)',
        'rgba(26, 188, 156, 0.88)',
        'rgba(26, 188, 156, 0.88)',
        'rgba(26, 188, 156, 0.88)'
      ],
      data: [65, 59, 80, 81, 56, 55, 50],
    }, {
      label: 'My second dataset',
      backgroundColor: [
        'rgba(93, 156, 236, 0.93)',
        'rgba(93, 156, 236, 0.93)',
        'rgba(93, 156, 236, 0.93)',
        'rgba(93, 156, 236, 0.93)',
        'rgba(93, 156, 236, 0.93)',
        'rgba(93, 156, 236, 0.93)',
        'rgba(93, 156, 236, 0.93)'
      ],
      hoverBackgroundColor: [
        'rgba(103, 162, 237, 0.82)',
        'rgba(103, 162, 237, 0.82)',
        'rgba(103, 162, 237, 0.82)',
        'rgba(103, 162, 237, 0.82)',
        'rgba(103, 162, 237, 0.82)',
        'rgba(103, 162, 237, 0.82)',
        'rgba(103, 162, 237, 0.82)'
      ],
      data: [60, 69, 85, 91, 58, 50, 45],
    }]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  /*Bar chart End*/

  /*Pie chart*/
  type4 = 'pie';
  data4 = {
    labels: [
      'Blue',
      'Orange',
      'Sea Green'
    ],
    datasets: [{
      data: [30, 30, 40],
      backgroundColor: [
        '#25A6F7',
        '#FB9A7D',
        '#01C0C8'
      ],
      hoverBackgroundColor: [
        '#6cc4fb',
        '#ffb59f',
        '#0dedf7'
      ]
    }]
  };

  donutChartData = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Currency Split'],
      ['CHF', 1],
      ['USD', 7],
      ['SGD', 12],
      ['RUB', 10],
      ['PHP', 10],
      ['JPY', 7],
      ['GBP', 1],
      ['HKD', 1],
      ['EUR', 22],
    ],
    options: {
      height: 300,
      title: 'Position Report By Currency',
      pieHole: 0.4,
      colors: [
        '#afafaf',
        '#2344dd',
        '#cb4ad0',
        '#93084e',
        '#e31604',
        '#da8f0e',
        '#b9e3b4',
        '#31b3e3',
        '#b9b80f',
      ]
    },
  };

  chatText = '';
  counter = 0;
  counter1 = 0;
  subscription: Subscription;
  completedPercent = 0;
  failedPercent = 0;
  failedCard = true;
  completedCard = true;
  appliedTheme: Subscription;
  appliedThemeClassOnTable = 'ag-theme-balham';
  sideBar = 'columns';
  colResizeDefault = 'shift';
  columnDefs = [
    {
      headerName: 'Status', field: 'status', width: 90, suppressMovable: true,
      filter: true, pivot: true, resizable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        let html = '';
        switch (params.value) {
          case 'completed':
            html = '<i class="icofont icofont-checked"></i>';
            break;
          case 'scheduled':
            html = '<i class="icofont icofont-clock-time"></i>';
            break;
          case 'failed':
            html = '<i class="icofont icofont-not-allowed"></i>';
            break;
        }
        return html;
      }
    },
    {
      headerName: 'chat', field: 'chat', filter: false, pivot: true, resizable: true, width: 60,
      cellStyle: {'text-align': 'center'}, suppressMovable: true,
      cellRenderer: (params) => {
        let className = '';
        if (params.getValue() === 'green') {
          className = 'icofont-ui-text-chat';
        } else {
          className = 'icofont-chat';
          this.chatData = [];
        }
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<i class="icofont ' + className + '"></i>';
        const eButton = eDiv.querySelectorAll('.icofont-chat')[0];
        const eButtonGreen = eDiv.querySelectorAll('.icofont-ui-text-chat')[0];

        const that = this;
        eButton && eButton.addEventListener('click', function () {
          that.chatData = [];
          document.querySelector('#' + 'effect-1').classList.add('md-show');
        });
        eButtonGreen && eButtonGreen.addEventListener('click', function () {
          that.chatData = [
            {
              userName: 'Tony Smith',
              chatText: 'I am waiting to send this report until I get one more peice of data to ' +
              'send along to the client. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
              Date: '2019-01-26',
              time: '9:15AM'
            },
            {
              userName: 'Chris Smith',
              chatText: 'The client call me asking for an update - has this been sent out?',
              Date: '2019-01-26',
              time: '11:30AM'
            },
            {
              userName: 'Tony Smith',
              chatText: 'Should be sent in 15 minutes - wrapping it up. Sorry for the wait.',
              Date: '2019-01-26',
              time: '11:45AM'
            }
          ];
          document.querySelector('#' + 'effect-1').classList.add('md-show');
        });

        return eDiv;
      },
    },
    {headerName: 'Date', width: 100, field: 'date', filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Client', width: 100, field: 'client', filter: 'agTextColumnFilter',  suppressMovable: true, pivot: true,
      cellRenderer: (params) => {
        return '<a href="#/clients/clientdetails" class="client-link">' + params.getValue() + '</a>';
      }
    },
    {
      headerName: 'Product(s)', width: 100, field: 'products', filter: 'agTextColumnFilter', suppressMovable: true, pivot: true,
    },
    {
      headerName: 'Preview', width: 70, field: 'preview', filter: false, suppressMovable: true, resizable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        return '<a href="#"><i class="icofont icofont-file-excel"></i></a>' +
          '<a href="#"><i class="icofont icofont-file-pdf"></i></a>';
      }, pivot: true
    },
    {
      headerName: 'Send', width: 70, field: 'send', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        return '<button class="btn btn-sm">Send</button>';
      }, pivot: true
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApi;
  gridColumnApi;
  rowData = [
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 76', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 76', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 76', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '12/May/2013', client: 'Client 76', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '18/May/2013', client: 'Client 65', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 65', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 65', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 65', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '27/May/2013', client: 'Client 59', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 60', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: 'green', date: '12/May/2013', client: 'Client 60', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '03/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '11/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: 'green', date: '09/May/2013', client: 'Client 77', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 77', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 77', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 67', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 67', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 67', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '12/May/2013', client: 'Client 64', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '18/May/2013', client: 'Client 68', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 68', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 68', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 68', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '27/May/2013', client: 'Client 67', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 60', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '12/May/2013', client: 'Client 60', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '03/May/2013', client: 'Client 78', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '11/May/2013', client: 'Client 78', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 78', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 79', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: 'green', date: '09/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '12/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '18/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 57', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '27/May/2013', client: 'Client 79', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 62', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '12/May/2013', client: 'Client 62', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '03/May/2013', client: 'Client 79', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '11/May/2013', client: 'Client 79', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 25', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 25', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 71', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 71', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 71', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 72', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 72', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '12/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '18/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 64', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 64', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 64', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '27/May/2013', client: 'Client 25', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: 'green', date: '09/May/2013', client: 'Client 60', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '12/May/2013', client: 'Client 60', products: 'IRD', preview: '', send: ''},
    {status: 'completed', chat: '', date: '03/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '11/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 72', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
    {status: 'completed', chat: '', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
  ];
  selectedRowsPerPage = 20;
  chatData = [
    {
      userName: 'Tony Smith',
      chatText: 'I am waiting to send this report until I get one more peice of data to ' +
      'send along to the client. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      Date: '2019-01-26',
      time: '9:15AM'
    },
    {
      userName: 'Chris Smith',
      chatText: 'The client call me asking for an update - has this been sent out?',
      Date: '2019-01-26',
      time: '11:30AM'
    },
    {
      userName: 'Tony Smith',
      chatText: 'Should be sent in 15 minutes - wrapping it up. Sorry for the wait.',
      Date: '2019-01-26',
      time: '11:45AM'
    }
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private toastyService: ToastyService, private refreshService: RefreshService) {
    this.subscription = this.refreshService.getRefreshCounter().subscribe(counter => {
      this.completedPercent = 0;
      this.failedPercent = 0;
      this.changeCount();

      setTimeout(() => {
        this.changeCompletedPercent();
      }, 400);
      this.counter = counter;
      this.counter1 = counter;
    });
    this.appliedTheme = this.refreshService.getRefreshCounter().subscribe(theme => {
      this.appliedThemeClassOnTable = theme === 'dark' ? 'ag-theme-dark' : 'ag-theme-balham';
    });
    this.fetchFilterData((data) => {
      // cache our list
      this.tempFilter = [...data];

      // push our inital complete list
      this.rowsFilter = data;
    });

    this.fetchTradeFilterData((data) => {
      // cache our list
      this.tempTradeFilter = [...data];

      // push our inital complete list
      this.rowsTradeFilter = data;
    });

    this.changeCompletedPercent();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onPageSizeChanged(newPageSize) {
    const value = this.selectedRowsPerPage; // document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  genderCellRenderer() {
    return alert('hi');
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  addChat() {
    if (!this.chatText) {
      return;
    }
    this.chatData.push({
      userName: 'Tony Smith',
      chatText: this.chatText,
      Date: '2019-01-26',
      time: '9:15AM'
    });

    this.clearChat();
  }

  clearChat() {
    this.chatText = '';
  }

  toggleFailedCard() {
    this.failedCard = !this.failedCard;
  }

  toggleCompletedCard() {
    this.completedCard = !this.completedCard;
  }

  changeCompletedPercent() {
    const that = this;
    const interval = setInterval(function () {
      that.completedPercent += 1;
      if (that.completedPercent >= 50)
        clearInterval(interval);
    }, 33);

    const interval2 = setInterval(function () {
      that.failedPercent += 1;
      if (that.failedPercent >= 10)
        clearInterval(interval2);
    }, 100);
  }

  changeCount() {
    this.counter += 1;
  }

  fetchTradeFilterData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/trade_search_data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  getRowClass = (row) => {
    if (row.Status && row.Status.trim().toLocaleString() === 'settlement required') {
      console.log('hi');
    }
    return {
      'row-color': (row.Status && row.Status.trim().toLowerCase() === 'settlement required')
    };
  };

  getViewport() {
    let size;
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      viewport = {
        size: size,
        width: w,
        height: h
      },
      views = {
        'xsmall': 320,
        'small': 768,
        'medium': 1024,
        'large': 1200
      };

    if ($('html').hasClass('lt-ie9')) {
      size = 'large';
    } else {
      size = (w <= views.xsmall) ? 'xsmall' : size;
      size = (w > views.xsmall && w < views.small) ? 'small' : size;
      size = (w >= views.small && w < views.medium) ? 'medium' : size;
      size = (w >= views.medium) ? 'large' : size;
      size = (w >= views.large) ? 'xlarge' : size;
    }

    viewport.size = size;

    return viewport;
  }

  isMobileView() {
    return this.isMobile(this.getViewport().size);
  }

  isMobile(size) {
    return (size === 'small' || size === 'xsmall');
  }

  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (options.type) {
      case 'default':
        this.toastyService.default(toastOptions);
        break;
      case 'info':
        this.toastyService.info(toastOptions);
        break;
      case 'success':
        this.toastyService.success(toastOptions);
        break;
      case 'wait':
        this.toastyService.wait(toastOptions);
        break;
      case 'error':
        this.toastyService.error(toastOptions);
        break;
      case 'warning':
        this.toastyService.warning(toastOptions);
        break;
    }
  }

  toggleCurrencyType(buySell) {
    if (buySell.ccySold === 'USD') {
      buySell.ccySold = 'EUR';
    } else {
      buySell.ccySold = 'USD';
    }
    buySell.calculatedTrade = buySell.getCalculatedTrade();
  }

  onSoldAmountChange(buySell) {
    buySell.calculatedTrade = buySell.getCalculatedTrade();
  }

  toggleRotateCurrency(buySell) {
    if (buySell.ccyPair === 'EURUSD') {
      buySell.ccyPair = 'USDEUR';
      buySell.tradeRate = EURTradeRate;
    } else {
      buySell.ccyPair = 'EURUSD';
      buySell.tradeRate = USDTradeRate;
    }
    const {tradeRateSmall, tradeRateLarge} = buySell.getTradeRates(buySell.tradeRate);
    buySell.tradeRateSmall = tradeRateSmall;
    buySell.tradeRateLarge = tradeRateLarge;
    buySell.calculatedTrade = buySell.getCalculatedTrade();
  }

  onDateOptionChange(event, buySell) {
    switch (event.target.value) {
      case 'O':
        buySell.maturityDate = {year: this.startYear, month: this.startMonth, day: this.startDate};
        break;
      case 'T':
        buySell.maturityDate = {year: this.startYear, month: this.startMonth, day: this.startDate + 1};
        break;
      case 'S':
        buySell.maturityDate = {year: this.endYear, month: this.endMonth, day: this.endDate};
        break;
    }
  }

  onTradeDateSelect(event, buySell) {
    const {year, month, day} = event;

    if (day === this.startDate) {
      buySell.maturityDateType = 'O';
    } else if (day === this.endDate) {
      buySell.maturityDateType = 'S';
    } else {
      buySell.maturityDateType = 'T';
    }
  }

  onAcceptClick(event) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    this.tradeDateTime = now;
    this.tradeDate = `${now.getUTCDate()} ${months[now.getUTCMonth()]}  ${now.getHours()}:${this.getMinutesFormatted(now.getMinutes())}`;
    this.confirmButtonText = confirmButton.confirm;
    this.selectedCreditAccount = accounts;
    this.selectedDebitAccount = accounts;
    this.selectedCard.status = 'Settlement Required';
    document.querySelector('#' + event).classList.add('md-show');
  }

  onDeclineClick(event, buySell) {
    buySell.onRequestClick = false;
  }

  onPlusClick(event) {
    this.plusClicked = true;
    this.buySellData = [...this.buySellData, new Card(true)];
  }

  onRequestClick(event, buySell) {
    this.selectedCard = buySell;
    buySell.onRequestClick = true;
    const max = this.rowsFilter[0];
    this.dealNo = `${parseInt(max.Deal_No) + 1}`;
  }

  onDebitChange(event) {
    this.selectedDebitAccount = event.target.value;
    this.changeConfirmButtonText();
  }

  onCreditChange(event) {
    this.selectedCreditAccount = event.target.value;
    this.changeConfirmButtonText();
  }

  changeConfirmButtonText() {
    if (this.selectedCreditAccount && this.selectedDebitAccount
      && this.selectedCreditAccount !== accounts && this.selectedDebitAccount !== accounts) {
      this.confirmButtonText = confirmButton.settlement;
      this.selectedCard.status = 'Confirmed';
    } else {
      this.confirmButtonText = confirmButton.confirm;
      this.selectedCard.status = 'Settlement Required';
    }
  }

  closeMyModal(event) {
    $(event.target).parents('.md-modal').removeClass('md-show');
  }

  onConfirmClick(event) {
    this.addToast({
      title: 'Trade confirmed',
      msg: 'You have confirmed the stock successfully',
      showClose: true, timeout: 10000, theme: 'bootstrap', type: 'success',
      position: 'bottom-right', closeOther: false
    });
    const max = this.rowsFilter[0];
    const mDate: NgbDateStruct = this.selectedCard.maturityDate;
    const now = this.tradeDateTime;
    const rowData = {
      'Deal_No': this.dealNo,
      'Product': this.selectedCard.product,
      'Buy_Sell': this.selectedCard.buySellType,
      'CCY_Pair': this.selectedCard.ccyPair,
      'CCY_sold': this.selectedCard.ccySold,
      'Amt_sold': this.selectedCard.amountSold,
      'CCY_bought': 'CAD',
      'Amt_bought': this.selectedCard.getCalculatedTrade(),
      'Start_Date': '',
      'Traded_On': `${now.getUTCMonth()}/${now.getUTCDate()}/${now.getUTCFullYear()}
        ${now.getHours()}:${this.getMinutesFormatted(now.getMinutes())}`,
      'Mature_on': `${mDate.month}/${mDate.day}/${mDate.year}`,
      'Status': this.selectedCard.status
    };
    this.rowsFilter = [rowData, ...this.rowsFilter];
    this.tempFilter = [rowData, ...this.tempFilter];
    this.closeMyModal(event);
    this.plusClicked = false;
    this.selectedCard.onRequestClick = false;

    // get the extra added card
    this.buySellData = this.buySellData.map((item) => {
      if (item.onPlusClick) {
        item.onPlusClick = false;
        item.onRequestClick = false;
      }

      return item;
    });
  }

  getMinutesFormatted(min) {
    return min.toLocaleString().length > 1 ? min : `0${min}`;
  }

  closeBuySellCard(event, onPlusClick) {
    if (onPlusClick) {
      this.buySellData = this.buySellData.filter((item) => {
        return !item.onPlusClick;
      });
      this.plusClicked = false;
    } else {
      $(event.target).parents('.col-xl-4').hide();
    }
  }

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

  fetchFilterData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/daily_monitoring_data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

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

  ngOnInit() {
    setTimeout(() => {
      // this.onAcceptClick('effect-1');
      const today = new Date();
      this.startYear = today.getUTCFullYear();
      this.startMonth = today.getUTCMonth() + 1;
      this.startDate = today.getUTCDate();

      this.endYear = today.getUTCFullYear();
      if (today.getUTCDate() === 29) {
        this.endMonth = today.getUTCMonth() + 2;
        this.endDate = 1;
      } else if (today.getUTCDate() === 30) {
        this.endMonth = today.getUTCMonth() + 2;
        this.endDate = 2;
      } else {
        this.endMonth = today.getUTCMonth() + 1;
        this.endDate = today.getUTCDate() + 2;
      }
      const chart1 = c3.generate({
        bindto: '#chart1',
        data: {
          columns: [
            ['Currency: Positive', 25, 0, 0, 0, 0, 0],
            ['Currency: Negative', 0, -30, -7, -4, -10, -2],
          ],
          type: 'bar',
          groups: [
            ['Currency: Positive', 'Currency: Negative']
          ],

        },
        color: {
          pattern: [
            '#4C5667',
            '#d62416',
          ]
        },
        grid: {
          y: {
            lines: [{value: 0}]
          }
        }
      });

      const chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 300, 350, 500, -10, 0, 320],
            ['data2', 130, 100, 180, 200, 150, 50]
          ],
          types: {
            data1: 'area-spline',
            data2: 'area-spline'
            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
          },
          colors: {
            data1: 'rgba(1, 192, 200, 0.92)',
            data2: 'rgba(26, 188, 156, 0.93)'
          },
          groups: [
            ['data1', 'data2']
          ]
        }
      });

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

      /*$.plot($('#monthlyprofit-3'), [{
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
          [12, 20],
          [13, 25],
          [14, 10],
          [15, 12],
          [16, 27],
          [17, 1],
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

      $.plot($('#client-map-2'), [{
        data: [
          [0, 0],
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
          [15, 20],
          [16, 10],
          [17, 15],
          [18, 12],
          [19, 27],
          [20, 20],
          [21, 15],
          [22, 0],
        ],
        color: '#ff5252',
        lines: {
          show: true,
          fill: true,
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

      $.plot($('#client-map-3'), [{
        data: [
          [0, 2],
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
          [14, 5],
        ],
        color: '#9ccc65',
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
          barWidth: 0.5,
          align: 'center',
          horizontal: false
        },
        points: {
          show: false
        },
      }], this.chartOption);

      $.plot($('#tot-lead'), [{
        data: [
          [0, 25],
          [1, 15],
          [2, 20],
          [3, 27],
          [4, 10],
          [5, 20],
          [6, 10],
          [7, 26],
          [8, 20],
          [9, 10],
          [10, 25],
          [11, 27],
          [12, 12],
          [13, 26],
        ],
        color: '#448aff',
        lines: {
          show: true,
          fill: true,
          lineWidth: 3
        },
        points: {
          show: false,
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#tot-vendor'), [{
        data: [
          [0, 25],
          [1, 15],
          [2, 25],
          [3, 27],
          [4, 10],
          [5, 20],
          [6, 15],
          [7, 26],
          [8, 20],
          [9, 13],
          [10, 25],
          [11, 27],
          [12, 12],
          [13, 20],
        ],
        color: '#9ccc65',
        lines: {
          show: true,
          fill: true,
          lineWidth: 3
        },
        points: {
          show: false,
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);

      $.plot($('#invoice-gen'), [{
        data: [
          [0, 25],
          [1, 30],
          [2, 25],
          [3, 27],
          [4, 10],
          [5, 20],
          [6, 15],
          [7, 26],
          [8, 10],
          [9, 13],
          [10, 25],
          [11, 27],
          [12, 12],
          [13, 27],
        ],
        color: '#ff5252',
        lines: {
          show: true,
          fill: true,
          lineWidth: 3
        },
        points: {
          show: false,
        },
        curvedLines: {
          apply: false,
        }
      }], this.chartOption);*/

    }, 75);
  }

}
