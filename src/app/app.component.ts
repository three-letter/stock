import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/users/login/login';

import { FirebaseService } from '../providers/firebase-service'

import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any ; //= TabsPage;

  constructor(platform: Platform, firebaseService: FirebaseService) {
		firebaseService.init();
    this.checkIsLogin();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  checkIsLogin() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

}
