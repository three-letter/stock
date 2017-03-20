import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../../tabs/tabs';

import { UserService } from '../../../providers/user-service';

/*
  Generated class for the My page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  constructor(
    public navCtrl: NavController,
    public userService: UserService
  ) {
  }

  gotoMyProfile() {

    if(this.userService.authOrLogin()) {
      this.navCtrl.push(TabsPage);
    }
  }
  
  logout() {
    this.userService.logout();
  }

}
