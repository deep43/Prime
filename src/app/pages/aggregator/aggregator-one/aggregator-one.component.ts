import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RefreshService} from '../../../shared/service/refresh.service';
import {Subscription} from 'rxjs';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

interface Investor {
  id?: number;
  investor?: string;
  vendor?: string;
  deadLine?: NgbDateStruct;
  dataSet?: string;
  status?: string;
  errors?: number;
  published?: string;
  review?: number;
}

@Component({
  selector: 'app-aggregator-one',
  templateUrl: './aggregator-one.component.html',
  styleUrls: [
    './aggregator-one.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
  ],
  encapsulation: ViewEncapsulation.None
})

export class AggregatorOneComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  chatText = '';
  subscription: Subscription;
  appliedTheme: Subscription;
  selectedInvDetail: Investor = {};

  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefs = [
    {
      headerName: 'Investor', field: 'investor',
      cellRenderer: (params) => {
        return '<a href="#/aggregator/aggregatortwo" class="client-link">' + params.getValue() + '</a>';
      },
      width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {headerName: 'Vendor', field: 'vendor', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Investor DeadLine',
      cellRenderer: (params) => {
        const date = params.getValue();
        const renderedDate = date ? `${date.year}-${date.month}-${date.day}` : 'TBD';
        return '<span>' + renderedDate + '</span>';
      },
      field: 'deadLine', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {headerName: 'Data Set', field: 'dataSet', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Status', field: 'status', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Errors', field: 'errors', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Review', field: 'review', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Published', field: 'published', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Review', field: 'review', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Edit', width: 70, filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<button class="btn btn-sm edit">Edit</button>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.edit')[0];
        eButton && eButton.addEventListener('click', function () {
          that.selectedInvDetail = params.data;
          document.querySelector('#effect-1').classList.add('md-show');
        });

        return eDiv;
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
  rowData: Investor[] = [
    {
      id: 1,
      investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 2, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: null,
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 3, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: null,
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 4, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 5, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: null,
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 6, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: null,
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 7, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 8, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 9, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 10, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 11, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 12, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 13, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 14, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 15, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 16, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 17, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 18, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
    {
      id: 19, investor: 'Commcise Test',
      vendor: 'OneAccess',
      deadLine: {day: 9, month: 12, year: 2018},
      dataSet: 'Jan\'19 - Mar\'19',
      status: 'In Progress',
      errors: 14,
      published: 'Published',
      review: 222
    },
  ];
  selectedRowsPerPage = 20;

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

  addInvestorDetail(event) {
    if (!this.selectedInvDetail.id) {
      this.selectedInvDetail.id = this.rowData.length + 1;
      this.rowData = [this.selectedInvDetail, ...this.rowData];
    } else {
      this.rowData = this.rowData.map((rowData) => {
        if (rowData.id === this.selectedInvDetail.id) {
          return this.selectedInvDetail;
        }

        return rowData;
      });
    }
    this.closeMyModal(event);
  }

  openMyModal(event) {
    this.selectedInvDetail = {};
    document.querySelector('#effect-1').classList.add('md-show');
  }

  closeMyModal(event) {
    this.selectedInvDetail = {};
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
