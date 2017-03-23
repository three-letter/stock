import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyProfileUpdatePage } from '../my-profile-update/my-profile-update';

import { UserService } from '../../../providers/user-service';


/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {

  myProfileUpdatePage = MyProfileUpdatePage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
  }


}
