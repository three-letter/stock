import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

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

  isAuth: boolean = false;

  constructor(
    public wilddogService: WilddogService,
    public events: Events
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
      } else {
        this.isAuth = false;
      }
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
