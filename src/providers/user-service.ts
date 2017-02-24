import { Injectable } from '@angular/core';

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

  constructor() {
		this.auth = wilddog.auth();
		this.users = wilddog.sync().ref("users");	
  }

	login(phone: string, password: string): any {
		return this.auth.signInWithPhoneAndPassword(phone, password);
	}

	signup(phone: string, password: string, nickname: string): any {
		return this.auth.createUserWithPhoneAndPassword(phone, password).then((newUser) => {
		this.users.child(newUser.uid).set({
			phone: phone,
      nickname: nickname
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
