import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RefreshService} from '../../../shared/service/refresh.service';
import {Subscription} from 'rxjs';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './report-sent.component.html',
  styleUrls: [
    './report-sent.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
  ],
  encapsulation: ViewEncapsulation.None
})

export class ReportSentComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  chatText = '';
  subscription: Subscription;
  appliedTheme: Subscription;

  appliedThemeClassOnTable = 'ag-theme-balham';
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
      headerName: 'Chat', field: 'chat', filter: false, pivot: true, resizable: true, width: 60,
      cellStyle: {'text-align': 'center', 'padding-top': '4px'}, suppressMovable: true,
      cellRenderer: (params) => {
        let className = '';
        if (params.getValue() === 'green') {
          className = 'ti-comment-alt';
        } else {
          className = 'ti-comment';
          this.chatData = [];
        }
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<i class="' + className + '"></i>';
        const eButton = eDiv.querySelectorAll('.ti-comment')[0];
        const eButtonGreen = eDiv.querySelectorAll('.ti-comment-alt')[0];

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
      headerName: 'Client', width: 100, field: 'client', filter: 'agTextColumnFilter', suppressMovable: true, pivot: true,
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
    {status: 'scheduled', chat: '', date: '18/May/2013', client: 'Client 65', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 65', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 65', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 65', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '27/May/2013', client: 'Client 59', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 60', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: 'green', date: '12/May/2013', client: 'Client 60', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '03/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '11/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: 'green', date: '09/May/2013', client: 'Client 77', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 77', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 77', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 67', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 67', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 67', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '12/May/2013', client: 'Client 64', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '18/May/2013', client: 'Client 68', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 68', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 68', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 68', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '27/May/2013', client: 'Client 67', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 60', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '12/May/2013', client: 'Client 60', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '03/May/2013', client: 'Client 78', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '11/May/2013', client: 'Client 78', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 78', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 79', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 55', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: 'green', date: '09/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '12/May/2013', client: 'Client 70', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '18/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 57', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '27/May/2013', client: 'Client 79', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 62', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '12/May/2013', client: 'Client 62', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '03/May/2013', client: 'Client 79', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '11/May/2013', client: 'Client 79', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 25', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 25', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 71', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 71', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 71', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 72', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 72', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 57', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '12/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '18/May/2013', client: 'Client 63', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '24/May/2013', client: 'Client 64', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 64', products: 'IRD', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 64', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '27/May/2013', client: 'Client 25', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 60', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '12/May/2013', client: 'Client 60', products: 'IRD', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '03/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '11/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 59', products: 'BOND', preview: '', send: ''},
    {status: 'failed', chat: '', date: '09/May/2013', client: 'Client 72', products: 'IRD FX BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: 'green', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
    {status: 'scheduled', chat: '', date: '09/May/2013', client: 'Client 75', products: 'BOND', preview: '', send: ''},
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

  closeMyModal(event) {
    $(event.target).parents('.md-modal').removeClass('md-show');
  }

  ngOnInit() {
    setTimeout(() => {
      this.appliedTheme = this.refreshService.getObservableTheme().subscribe(theme => {
        this.appliedThemeClassOnTable = theme === 'dark' ? 'ag-theme-dark' : 'ag-theme-balham';
      });
    }, 75);
  }

}
