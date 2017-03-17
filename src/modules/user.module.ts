import { NgModule } from '@angular/core';
import { Platform, Events, ModalController } from 'ionic-angular';

import { LoginPage } from '../pages/users/login/login';
import { SignupPage } from '../pages/users/signup/signup';

import { UserService } from '../providers/user-service';

import * as wilddog from 'wilddog';

@NgModule({
  declarations: [
    LoginPage,
    SignupPage
  ],
  imports: [
  ],
  entryComponents: [
    LoginPage,
    SignupPage
  ],
  providers: [UserService]
})

export class UserModule {

  constructor(
    public platform: Platform, 
    public events: Events,
    public modalCtrl: ModalController
  ) {
    this.subscribeEvents();

    platform.ready().then(() => {
      this.checkIsLogin();
    });
  }

  subscribeEvents() {
    this.events.subscribe("app:gotoLogin", (params) => {
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    });
  }

  checkIsLogin() {
    wilddog.auth().onAuthStateChanged((user) => {
      if(user) {
        this.events.publish("app:root");
      } else {
        this.events.publish("app:gotoLogin");
      }
    });
  }

}
