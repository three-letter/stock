import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { SignupPage } from '../signup/signup';
import { ResetpwdPage } from '../resetpwd/resetpwd';
import { TabsPage } from '../../tabs/tabs';

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
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
		this.loginForm = formBuilder.group({
			phone: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
		});
	}

	login() {
    this.submitAttempt = true;

		if(!this.loginForm.valid) {
			console.log("Login Form data invalid");
		} else {
			let phone = this.loginForm.value.phone;
			let password = this.loginForm.value.password;

			this.userService.login(phone, password).then(user => {
				this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(TabsPage);
        });
			}, error => {
				this.loading.dismiss().then(() => {
					let alert = this.alertCtrl.create({
						message: error.message,
						buttons: [{text: "OK", role: "cancel"}]
					});
					alert.present();
				}).catch(() => {});
			});

			this.loading = this.loadingCtrl.create({
				//dismissOnPageChange: true
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
