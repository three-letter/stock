import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { SignupPage } from '../signup/signup';
import { ResetpwdPage } from '../resetpwd/resetpwd';
import { HomePage } from '../../home/home';

import { UserService } from '../../../providers/user-service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	public loginForm;
	public loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
		this.loginForm = formBuilder.group({
			email: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
		});
	}

	login() {
		if(!this.loginForm.valid) {
			console.log("Login Form valid: " + this.loginForm.value);
		} else {
			let email = this.loginForm.value.email;
			let password = this.loginForm.value.password;

			this.userService.login(email, password).then(user => {
				this.navCtrl.setRoot(HomePage);
			}, error => {
				this.loading.dismiss().then(() => {
					let alert = this.alertCtrl.create({
						message: error.message,
						buttons: [{text: "OK", role: "cancel"}]
					});
					alert.present();
				});
			});

			this.loading = this.loadingCtrl.create({
				dismissOnPageChange: true
			});

			this.loading.present();
		}	
	}

	signup() {
		this.navCtrl.push(SignupPage);
	}

	resetPwd() {
		this.navCtrl.push(ResetpwdPage);
	}

}
