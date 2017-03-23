import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../../providers/user-service';


/*
  Generated class for the MyProfileUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile-update',
  templateUrl: 'my-profile-update.html'
})
export class MyProfileUpdatePage {

  item: string;
  isUpdated: string = '';
  userInfo: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
    this.item = navParams.get('item');
    this.userInfo = userService.userInfo;
  }

  ngOnDestroy() {
    if(this.isUpdated) {
      let params = {};
      params[this.isUpdated] = this.userInfo[this.isUpdated];

      this.userService.updateUser(params);
    }
  }

}
