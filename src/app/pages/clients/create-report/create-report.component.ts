import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {Subscription} from 'rxjs';
import {RefreshService} from '../../../shared/service/refresh.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

declare var $: any;

interface Schedule {
  id?: Number;
  occurance?: String;
  pattern?: NgbDateStruct;
  isDeleted?: Boolean;
}

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss',
  ]
})
export class CreateReportComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  appliedTheme: Subscription;
  allAccountChecked = false;
  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefs = [
    {
      headerName: 'Report Name', field: 'reportName',
      filter: true, resizable: true, suppressMovable: true, pivot: true
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
    resizable: true,
    enablePivot: true,
  };

  accounts = [
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '03910001', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '039100011', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '0391000111', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '039100021', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '03910002', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '03910003', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '03910005', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '039100056', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '0391000567', selected: false, childHidden: true
    },
    {
      childAccounts: [
        {number: '030001', selected: false},
        {number: '039001', selected: false},
        {number: '0391000', selected: false},
        {number: '039001', selected: false},
        {number: '03911', selected: false}
      ], number: '039100058', selected: false, childHidden: true
    }
  ];

  schedules: Schedule[] = [
    {id: 1, occurance: 'Daily', pattern: {day: 1, month: 2, year: 2019}, isDeleted: false},
    {id: 2, occurance: 'Monthly', pattern: {day: 4, month: 2, year: 2019}, isDeleted: false},
    {id: 3, occurance: 'Monthly', pattern: {day: 10, month: 2, year: 2019}, isDeleted: false}
  ];

  selectedSchedule: Schedule = {};
  lastScheduleId = this.schedules.length;

  activities = [{shown: false}];
  cashBalances = [{shown: false}];

  toggleGrid(data) {
    data.shown = !data.shown;
  }

  addGrid(gridData) {
    gridData.push({shown: false});
  }

  onDeleted(schedule) {
    schedule.isDeleted = true;
  };

  toggleAccounts(account) {
    account.childHidden = !account.childHidden;
  }

  onAllChange() {
    const that = this;
    that.allAccountChecked = !that.allAccountChecked;
    this.accounts = this.accounts.map((item) => {
      item.selected = that.allAccountChecked;
      return item;
    });
  }

  onAddClick(schedule) {
    this.selectedSchedule = schedule;
    document.querySelector('#' + 'effect-2').classList.add('md-show');
  }

  saveSchedule(event) {
    if (this.selectedSchedule.id) {
      this.schedules = this.schedules.map((schedule) => {
        if (this.selectedSchedule.id === schedule.id) {
          schedule.occurance = this.selectedSchedule.occurance;
          schedule.pattern = this.selectedSchedule.pattern;
        }
        return schedule;
      });
    } else {
      this.selectedSchedule.id = this.lastScheduleId + 1;
      this.schedules = [this.selectedSchedule, ...this.schedules];
    }

    this.closeMyModal(event);
  }

  closeMyModal(event) {
    $(event.target).parents('.md-modal').removeClass('md-show');
  }

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

  changeAccountRadio(type) {
    let checked = false;
    if (type === 'all') {
      checked = true;
    }

    this.allAccountChecked = checked;
    this.accounts = this.accounts.map((item) => {
      item.selected = checked;
      return item;
    });
  }

  ngOnInit() {
    this.changeAccountRadio('all');
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
}
