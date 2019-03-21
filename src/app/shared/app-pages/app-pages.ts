import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state?: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const AppPages = [
  {
    label: '',
    main: [
      {
        state: 'monitoring',
        main_state: '',
        short_label: 'D',
        name: 'Daily Monitoring',
        type: 'sub',
        icon: 'icofont icofont-computer',
        children: [
          {
            state: 'daily',
            name: 'Reports Pending'
          },
          {
            state: 'sent',
            name: 'Reports Sent'
          },
        ]
      },
      {
        state: 'clients',
        main_state: '',
        short_label: 'D',
        name: 'Clients',
        type: 'sub',
        icon: 'icofont icofont-user-search',
        children: [
          {
            state: 'clientlist',
            name: 'Client List'
          }
        ]
      },
      {
        state: '',
        main_state: '',
        short_label: 'D',
        name: 'Templates',
        type: 'sub',
        icon: 'feather icon-layers',
        children: [
          {
            state: '',
            name: 'Template List'
          },
          {
            state: '',
            name: 'Create New'
          },
        ]
      },
      {
        state: 'aggregator',
        main_state: '',
        short_label: 'D',
        name: 'Aggregator',
        type: 'sub',
        icon: 'icofont icofont-binary',
        children: [
          {
            state: 'aggregatorone',
            name: 'Aggregator 1'
          },
          {
            state: 'aggregatortwo',
            name: 'Aggregator 2'
          },
        ]
      }
    ],
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return AppPages;
  }
}
