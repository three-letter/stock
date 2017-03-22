import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WilddogService } from '../providers/wilddog-service';

import * as wilddog from 'wilddog';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
	public auth: any;
	public users: any;

  USER_INFO: string = 'user_info';
  userInfo: any;

  isAuth: boolean = false;

  constructor(
    public wilddogService: WilddogService,
    public events: Events,
    public storage: Storage
  ) {
		wilddogService.init();
		
    this.auth = wilddog.auth();
		this.users = wilddog.sync().ref("users");	
    
    this.checkIsLogin();
  }

  checkIsLogin() {
    this.auth.onAuthStateChanged((user) => {
      if(user) {
        this.isAuth = true;
        this.fetchUser();
      } else {
        this.isAuth = false;
      }
    });
  }

  fetchUser() {
    let userProfile = {};
    let uid = this.auth.currentUser.uid;
    this.users.child(uid).on("value", (snapshot) => {
      let data = snapshot.val();
      userProfile = JSON.stringify(data);
      // storage user info
      this.userInfo = userProfile;
      this.storage.set(this.USER_INFO, this.userInfo);
    });

  }

  getUser() {
    return this.storage.get(this.USER_INFO).then(value => {
      this.userInfo = JSON.parse(value);
      return this.userInfo;
    });
  }

  authOrLogin() {
    console.log("auth or login: " + this.isAuth);
    if(this.isAuth) {
      return true;
    } else {
      this.events.publish("app:gotoLogin");
    }
  }

	login(phone: string, password: string): any {
		return this.auth.signInWithPhoneAndPassword(phone, password);
	}

	signup(phone: string, password: string, displayName: string): any {
		return this.auth.createUserWithPhoneAndPassword(phone, password).then((newUser) => {
		this.users.child(newUser.uid).set({
			phone: phone,
      displayName: displayName,
      photoURL: "./assets/images/userAvatar-default.png"
		});

    newUser.updateProfile({
      displayName: displayName,
      photoURL: "./assets/images/userAvatar-default.png"
    });

		});
	}

	resetPwd(phone: string): any {
		return this.auth.sendPasswordResetPhone(phone);
	}

	logout(): any {
		return this.auth.signOut();
	}

}
