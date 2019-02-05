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

const MENUITEMS = [
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
            state: 'daily',
            name: 'Reports Charts'
          },
          {
            state: 'daily',
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
        icon: 'icofont icofont-computer',
        children: [
          {
            state: 'clientdetails',
            name: 'Client Details'
          },
          {
            state: 'clientlist',
            name: 'Client List'
          },
          {
            state: 'createreport',
            name: 'Create Report'
          },
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
      }/*,
      {
        main_state: '',
        state: 'clientsearch',
        short_label: 'N',
        name: 'Client List',
        type: 'link',
        icon: 'feather icon-users'
      },
      {
        main_state: 'dashboard',
        state: '',
        short_label: 'S',
        name: 'Templates',
        type: 'link',
        icon: 'feather icon-layers'
      }*/
    ],
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
