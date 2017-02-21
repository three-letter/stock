import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { HomePage } from '../../home/home';

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
			email: ['', Validators.compose([Validators.minLength(6), Validators.required])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nickname: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  register() {
    this.submitAttempt = true;
		
    if(!this.registerForm.valid) {
			console.log("Login Form data invalid");
    } else {
      let email = this.registerForm.value.email;
      let password = this.registerForm.value.password;
      let nickname = this.registerForm.value.nickname;

      this.userService.signup(email, password, nickname).then(userService => {
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
  

}
