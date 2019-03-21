import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RefreshService} from '../../../shared/service/refresh.service';
import {Subscription} from 'rxjs';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

declare let $: any;

interface InvestorDetail {
  id?: any;
  status?: string;
  fromToDate?: string;
  interactionTitle?: string;
  interactionType?: string;
  location?: string;
  companies?: string;
  investorAttendees?: string;
  brokerAttendees?: string;
}

@Component({
  selector: 'app-aggregator-two',
  templateUrl: './aggregator-two.component.html',
  styleUrls: [
    './aggregator-two.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
    '../../../../../node_modules/ng2-toasty/style-bootstrap.css',
    '../../../../../node_modules/ng2-toasty/style-default.css',
    '../../../../../node_modules/ng2-toasty/style-material.css',
  ],
  encapsulation: ViewEncapsulation.None
})

export class AggregatorTwoComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

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

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  gridApi;
  gridColumnApi;
  columnDefs = [
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 20,
      filter: false
    },
    {headerName: 'Status', width: 100, field: 'status', filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'From To Date', width: 100, field: 'fromToDate', filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Interaction Title',
      width: 100,
      field: 'interactionTitle',
      filter: 'agTextColumnFilter',
      pivot: true,
      suppressMovable: true
    },
    {
      headerName: 'Interaction Type',
      width: 100,
      field: 'interactionType',
      filter: 'agSetColumnFilter',
      pivot: true,
      suppressMovable: true
    },
    {headerName: 'Location', width: 100, field: 'location', filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Companies', width: 100, field: 'companies', filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Investor Attendees',
      width: 100,
      field: 'investorAttendees',
      filter: 'agTextColumnFilter',
      pivot: true,
      suppressMovable: true
    },
    {
      headerName: 'Broker Attendees',
      width: 100,
      field: 'brokerAttendees',
      filter: 'agTextColumnFilter',
      pivot: true,
      suppressMovable: true
    },
  ];
  rowData: Array<InvestorDetail> = [
    {
      id: 1,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Email',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 2,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'CallGroup',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 3,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Video 1X1',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 4,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'VideoGroup',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 5,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'IncomingCall',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 6,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'OutgoingCall',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 7,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'ElectronicCommunication',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 8,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'Delivered',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 9,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'ChannelCheck',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 10,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'Data',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 11,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Survey',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 12,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'VoiceMail',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 13,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Email',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 14,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'Data',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 15,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Survey',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 16,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'VoiceMail',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 17,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Data',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 18,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'Survey',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 19,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Email',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 20,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'VoiceMail',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 21,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'IncomingCall',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 22,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'OutgoingCall',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 24,
      status: 'Published',
      fromToDate: 'Jan 24,2019 Jan 26,2019',
      interactionTitle: '2019 whistler Conference',
      interactionType: 'Survey',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
    {
      id: 25,
      status: 'UnPublished',
      fromToDate: 'Feb 17,2019 Feb 19,2019',
      interactionTitle: 'Seven Generation Marketing',
      interactionType: 'VoiceMail',
      location: 'Whistler Canada',
      companies: 'Boyd Group Income Fund(BYD UN)',
      investorAttendees: 'Matt HotchSeller',
      brokerAttendees: 'Chris Maurer'
    },
  ];
  selectedRowsPerPage = 10;
  selectedInvestor: InvestorDetail = {};

  constructor(private router: Router, private route: ActivatedRoute, private toastyService: ToastyService) {
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  openMyModal(event) {
    if (this.gridApi.getSelectedRows().length !== 1) {
      /*this.addToast({
        title: 'Wrong Interactions Selection',
        msg: 'You have to select one Interaction',
        showClose: true, timeout: 10000, theme: 'bootstrap', type: 'success',
        position: 'bottom-right', closeOther: false
      });*/

      alert('You have to select only one Interaction');

      return;
    }

    this.selectedInvestor = Object.assign({}, ...this.gridApi.getSelectedRows()[0]);
    document.querySelector('#effect-1').classList.add('md-show');
  }

  closeMyModal(event) {
    $(event.target).parents('.md-modal').removeClass('md-show');
  }

  onPreviousClick() {
    this.selectedInvestor = this.rowData.filter((rowData) => {
      return rowData.id === this.selectedInvestor.id - 1;
    })[0];

    /*this.gridApi.forEachNode((node) => {
      if (node.data.id === this.selectedInvestor.id) {
        node.setSelected(true);
      }
    });*/
  }

  onNextClick() {
    this.selectedInvestor = this.rowData.filter((rowData) => {
      return rowData.id === this.selectedInvestor.id + 1;
    })[0];

    /*this.gridApi.forEachNode((node) => {
      if (node.data.id === this.selectedInvestor.id) {
        node.setSelected(true);
      }
    });*/
  }

  onPageSizeChanged(newPageSize) {
    const value = this.selectedRowsPerPage; // document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
  }

}
