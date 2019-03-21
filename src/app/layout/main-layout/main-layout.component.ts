import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {MenuItems} from '../../shared/app-pages/app-pages';
import {RefreshService} from '../../shared/service/refresh.service';

@Component({
  selector: 'app-admin',
  templateUrl: './main-layout.component.html',
  styleUrls: [
    './main-layout.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss',
  ],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'visible',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '280px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  public animateSidebar: string;
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;
  public appliedDarkTheme = false;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string;

  public profileNotification: string;
  public profileNotificationClass: string;

  public searchWidth: number;
  public searchWidthString: string;

  public navRight: string;
  public selectedTheme: string;
  public windowWidth: number;

  public toggleOn: boolean;
  public toggleIcon: string;
  public navBarTheme: string;
  public activeItemTheme: string;

  public headerFixedTop: string;

  public menuTitleTheme: string;
  public dropDownIcon: string;
  public subItemIcon: string;

  public configOpenRightBar: string;
  public displayBoxLayout: string;
  public isVerticalLayoutChecked: boolean;
  public isSidebarChecked: boolean;
  public isHeaderChecked: boolean;
  public headerFixedMargin: string;
  public sidebarFixedHeight: string;
  public sidebarFixedNavHeight: string;
  public itemBorderStyle: string;
  public subItemBorder: boolean;
  public itemBorder: boolean;

  public isCollapsedSideBar: string;
  public psDisabled: string;
  public perfectDisable: string;

  public config: any;
  public searchInterval: any;
  public megaMenuOpened = false;

  scroll = (): void => {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 50) {

      if (this.pcodedDeviceType === 'desktop') {
        this.headerFixedTop = '0';
      }
      this.sidebarFixedNavHeight = '100%';
    } else {
      if (this.pcodedDeviceType === 'desktop') {
        this.headerFixedTop = 'auto';
      }
      this.sidebarFixedNavHeight = '';
    }
  };

  constructor(public menuItems: MenuItems, private refreshService: RefreshService) {
    this.animateSidebar = '';
    this.navType = 'st2';
    this.themeLayout = 'vertical';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.pcodedDeviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.vnavigationView = 'view1';
    this.freamType = 'theme1';
    this.sidebarImg = 'false';
    this.sidebarImgType = 'img1';
    this.layoutType = 'light'; // light(default) dark(dark)

    this.headerTheme = 'theme1'; // theme1(default)
    this.pcodedHeaderPosition = 'fixed';

    this.headerFixedTop = 'auto';

    this.liveNotification = 'an-off';
    this.profileNotification = 'an-off';

    this.searchWidth = 0;

    this.navRight = 'nav-on';

    this.toggleOn = true;
    this.toggleIcon = 'icon-toggle-right';
    this.navBarTheme = 'themelight1'; // themelight1(default) theme1(dark)
    this.activeItemTheme = 'theme1';
    this.menuTitleTheme = 'theme1'; // theme1(default) theme10(dark)
    this.dropDownIcon = 'style1';
    this.subItemIcon = 'style1';

    this.displayBoxLayout = 'd-none';
    this.isVerticalLayoutChecked = false;
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;
    this.headerFixedMargin = '50px'; // 50px
    this.sidebarFixedHeight = 'calc(100vh - 55px)'; // calc(100vh - 190px)
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.itemBorder = true;

    this.isCollapsedSideBar = 'no-block';

    this.perfectDisable = '';

    this.windowWidth = window.innerWidth;

    this.setMenuAttributes(this.windowWidth);
    this.setHeaderAttributes(this.windowWidth);
  }

  ngOnInit() {
    // this.setLayoutType('dark');
    this.setBackgroundPattern('theme1');
    // this.setVerticalLayout();
  }

  toggleMegaMenu() {
    this.megaMenuOpened = !this.megaMenuOpened;
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    let reSizeFlag = true;
    if (this.pcodedDeviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 992) {
      reSizeFlag = false;
    } else if (this.pcodedDeviceType === 'phone' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      // this.setMenuAttributes(this.windowWidth);
    }
  }

  setHeaderAttributes(windowWidth) {
    if (windowWidth <= 992) {
      this.navRight = 'nav-off';
    } else {
      this.navRight = 'nav-on';
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 992) {
      this.pcodedDeviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
      this.toggleIcon = 'icon-toggle-left';
      this.headerFixedTop = '50px';
      this.headerFixedMargin = '0';
    } else if (windowWidth < 768) {
      this.pcodedDeviceType = 'phone';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
      this.toggleIcon = 'icon-toggle-left';
      this.headerFixedTop = '50px';
      this.headerFixedMargin = '0';
    } else {
      this.pcodedDeviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
      this.toggleIcon = 'icon-toggle-right';
      this.headerFixedMargin = '50px';
    }
  }

  toggleHeaderNavRight() {
    this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
  }


  toggleTheme() {
    this.selectedTheme = this.selectedTheme === 'dark' ? 'light' : 'dark';
    this.setLayoutType(this.selectedTheme);
  }

  toggleLiveNotification() {
    if (this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }

    this.liveNotification = this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.liveNotificationClass = this.liveNotification === 'an-animate' ? 'show' : '';
  }

  toggleProfileNotification() {
    if (this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    }

    this.profileNotification = this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.profileNotificationClass = this.profileNotification === 'an-animate' ? 'show' : '';
  }

  notificationOutsideClick(ele: string) {
    if (ele === 'live' && this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }
  }

  searchOn() {
    document.querySelector('#main-search').classList.add('open');
    this.searchInterval = setInterval(() => {
      if (this.searchWidth >= 200) {
        clearInterval(this.searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth + 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  searchOff() {
    this.searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search').classList.remove('open');
        clearInterval(this.searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth - 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  ngOnDestroy() {
    if (this.searchInterval) {
      clearInterval(this.searchInterval);
    }
  }

  toggleOpened(e) {
    if (this.windowWidth <= 992) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      if (this.navRight === 'nav-on') {
        this.toggleHeaderNavRight();
      }
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    } else {
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'collapsed' : 'expanded';
    }
    this.toggleIcon = this.verticalNavType === 'expanded' ? 'icon-toggle-right' : 'icon-toggle-left';
    this.animateSidebar = 'pcoded-toggle-animate';

    if (this.verticalNavType === 'collapsed') {
      this.perfectDisable = 'disabled';
      this.sidebarFixedHeight = '100%';
    } else {
      this.perfectDisable = '';
    }

    if (this.verticalNavType === 'collapsed' && this.isHeaderChecked === false) {
      this.setSidebarPosition();
    }

    setTimeout(() => {
      this.animateSidebar = '';
    }, 500);
  }

  onClickedOutsideSidebar(e: Event) {
    if ((this.windowWidth <= 992 && this.toggleOn && this.verticalNavType !== 'offcanvas') || this.verticalEffect === 'overlay') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
      this.toggleIcon = 'icon-toggle-left';
    }
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      this.sidebarImg = 'false';
    } else {
      this.menuTitleTheme = 'theme9';
      this.navBarTheme = 'theme1';
      this.sidebarImg = 'false';
    }
  }

  setLayoutType(type: string) {
    if (type === 'dark') {
      this.headerTheme = 'theme1';
      this.navBarTheme = 'theme1';
      this.activeItemTheme = 'theme1';
      this.freamType = 'theme1';
      document.querySelector('body').classList.add('dark');
      this.setBackgroundPattern('theme1');
      this.menuTitleTheme = 'theme9';
      this.layoutType = type;
      this.sidebarImg = 'false';
      this.appliedDarkTheme = true;
      this.refreshService.setObservableTheme('dark');
    }
    else if (type === 'light') {
      this.headerTheme = 'theme1';
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      this.activeItemTheme = 'theme1';
      this.freamType = 'theme1';
      document.querySelector('body').classList.remove('dark');
      this.setBackgroundPattern('theme1');
      this.layoutType = type;
      this.sidebarImg = 'false';
      this.appliedDarkTheme = false;
      this.refreshService.setObservableTheme('light');
    }
    else if (type === 'img') {
      this.sidebarImg = 'true';
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      this.freamType = 'theme1';
      document.querySelector('body').classList.remove('dark');
      this.setBackgroundPattern('theme1');
      this.activeItemTheme = 'theme1';
    }
  }

  setVerticalLayout() {
    this.isVerticalLayoutChecked = !this.isVerticalLayoutChecked;
    if (this.isVerticalLayoutChecked) {
      this.verticalLayout = 'box';
      this.displayBoxLayout = '';
      this.pcodedHeaderPosition = 'relative';
      this.headerFixedMargin = '0';
    } else {
      this.verticalLayout = 'wide';
      this.displayBoxLayout = 'd-none';
      this.pcodedHeaderPosition = 'fixed';
      this.headerFixedMargin = '50px';
    }
  }

  toggleFullScreen() {
    if (this.verticalLayout === 'box') {
      this.headerFixedMargin = '0px';
    }
    if (this.verticalLayout === 'wide') {
      this.headerFixedMargin = '50px';
    }
  }

  setBackgroundPattern(pattern: string) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
    // this.menuTitleTheme = this.freamType = this.activeItemTheme = this.headerTheme = pattern;
  }

  setSidebarPosition() {
    if (this.verticalNavType !== 'collapsed') {
      this.isSidebarChecked = !this.isSidebarChecked;
      this.sidebarFixedHeight = this.isSidebarChecked === true ? 'calc(100vh - 50px)' : '100%';
      if (this.isHeaderChecked === false) {
        window.addEventListener('scroll', this.scroll, true);
        window.scrollTo(0, 0);
      }
    }
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '50px' : '';
    if (this.isHeaderChecked === false) {
      window.addEventListener('scroll', this.scroll, true);
      window.scrollTo(0, 0);
    } else {
      window.removeEventListener('scroll', this.scroll, true);
      if (this.pcodedDeviceType === 'desktop') {
        this.headerFixedTop = 'auto';
      }
      if (this.verticalNavType !== 'collapsed') {
        this.sidebarFixedHeight = this.isSidebarChecked === true ? 'calc(100vh - 50px)' : 'calc(100vh + 50px)';
      }
    }
  }

  toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
    if (this.verticalNavType !== 'collapsed') {
      this.sidebarFixedHeight = this.isCollapsedSideBar === 'yes-block' ? 'calc(100vh - 50px)' : 'calc(100vh - 50px)';
    }
  }

  hoverOutsideSidebar() {
    if (this.verticalNavType === 'collapsed') {
      const mainEle = document.querySelectorAll('.pcoded-trigger');
      for (let i = 0; i < mainEle.length; i++) {
        mainEle[i].classList.remove('pcoded-trigger');
      }
    }
  }

  fireClick(e) {
    if (this.verticalNavType === 'collapsed') {
      const parentEle = e.target.parentNode.parentNode;
      if (parentEle.classList.contains('pcoded-trigger')) {
        const subEle = parentEle.querySelectorAll('.pcoded-hasmenu');
        for (let i = 0; i < subEle.length; i++) {
          if (subEle[i].classList.contains('pcoded-trigger')) {
            subEle[i].classList.remove('pcoded-trigger');
          }
        }
      } else {
        e.target.click();
      }
    }
  }

  fireClickLeave(e) {
    if (this.verticalNavType === 'collapsed') {
      const parentEle = <HTMLElement>e.target.parentNode.parentNode;
      const subEle = parentEle.querySelectorAll('.pcoded-hasmenu');
      for (let i = 0; i < subEle.length; i++) {
        if (subEle[i].classList.contains('pcoded-trigger')) {
          subEle[i].classList.remove('pcoded-trigger');
        }
      }
    }
  }

}
