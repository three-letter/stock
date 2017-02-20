import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

/*
	 Generated class for the FirebaseService provider.

	 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
	 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FirebaseService {
	public db: any;

	init() {
		const fbConfig = {
			apiKey: "AIzaSyAi0gbHE_LWPKM2Kqy9ad3mS3V-hYx5Lg4",
			authDomain: "stock-45238.firebaseapp.com",
			databaseURL: "https://stock-45238.firebaseio.com",
			storageBucket: "stock-45238.appspot.com",
			messagingSenderId: "758900416536"
		};

		firebase.initializeApp(fbConfig);
		this.db = firebase.database().ref("/");
	}

}
