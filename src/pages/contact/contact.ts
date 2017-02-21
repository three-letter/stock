import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../users/login/login';

import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public userService: UserService) {
  }

  logout() {
    this.userService.logout().then(() => {
      this.navCtrl.setRoot(LoginPage);
    }); 
  }

}
