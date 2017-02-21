import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

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
		this.auth = firebase.auth();
		this.users = firebase.database().ref("users");	
  }

	login(email: string, password: string): any {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	signup(email: string, password: string): any {
		return this.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
		this.users.child(newUser.uid).set({
			email: email
		});
		});
	}

	resetPwd(email: string): any {
		return this.auth.sendPasswordResetEmail(email);
	}

	logout(): any {
		return this.auth.signOut();
	}

}
