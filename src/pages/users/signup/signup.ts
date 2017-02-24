import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { TabsPage } from '../../tabs/tabs';

import { UserService } from '../../../providers/user-service';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public registerForm;
  public loading;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.registerForm = formBuilder.group({
			phone: ['', Validators.compose([Validators.minLength(6), Validators.required])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nickname: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  register() {
    this.submitAttempt = true;
		
    if(!this.registerForm.valid) {
			console.log("Login Form data invalid");
    } else {
      let phone = this.registerForm.value.phone;
      let password = this.registerForm.value.password;
      let nickname = this.registerForm.value.nickname;

      this.userService.signup(phone, password, nickname).then(userService => {
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
				});
      });

			this.loading = this.loadingCtrl.create({
				//dismissOnPageChange: true
			});

			this.loading.present();
    }
  }
  

}
