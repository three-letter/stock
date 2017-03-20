import { NgModule } from '@angular/core';
import { Platform, Events, ModalController, IonicModule } from 'ionic-angular';

import { LoginPage } from '../pages/users/login/login';

import { MyPage } from '../pages/users/my/my';

import { UserService } from '../providers/user-service';

@NgModule({
  declarations: [
    LoginPage,
    MyPage
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    LoginPage,
    MyPage
  ],
  providers: [UserService]
})

export class UserModule {

  constructor(
    public platform: Platform, 
    public events: Events,
    public userService: UserService,
    public modalCtrl: ModalController
  ) {
    userService.checkIsLogin();
    this.subscribeEvents();

    platform.ready().then(() => {
    });
  }

  subscribeEvents() {
    this.events.subscribe("app:gotoLogin", (params) => {
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    });
  }


}
