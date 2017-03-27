import { Component } from '@angular/core';

import { SummaryPage } from '../stocks/summary/summary';
import { AboutPage } from '../about/about';
import { MyPage } from '../users/my/my';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SummaryPage;
  tab2Root: any = AboutPage;
  tab3Root: any = MyPage;

  constructor() {

  }
}
