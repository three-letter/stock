import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

import { Device } from 'ionic-native';

import { SignupPage } from '../signup/signup';
import { ResetpwdPage } from '../resetpwd/resetpwd';
import { TabsPage } from '../../tabs/tabs';

import { UserService } from '../../../providers/user-service';

import * as wilddog from 'wilddog';

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

  logInModel: {phone?: string, password?: string} = {};
  signUpModel: {displayName?: string, phone?: string, password?: string} = {};
  currentModal: string = 'LogIn';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userService: UserService, 
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController
  ) {
	}

  cancelModal() {
    this.viewCtrl.dismiss();
  }

  logInHandler(ngForm) {
    let phone = this.logInModel.phone;
    let password = this.logInModel.password;

    if(ngForm.valid) {
      // start loading
			this.loading = this.loadingCtrl.create({
				//dismissOnPageChange: true
			});
			this.loading.present();

			this.userService.login(phone, password).then(user => {
				this.loading.dismiss().then(() => {
          this.viewCtrl.dismiss();  
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
    }

  }

  signUpHandler(ngForm) {
    let displayName = this.signUpModel.displayName;
    let phone = this.signUpModel.phone;
    let password = this.signUpModel.password;

    if(ngForm.valid) {
      // start loading
			this.loading = this.loadingCtrl.create({
				//dismissOnPageChange: true
			});
			this.loading.present();

			this.userService.signup(phone, password, displayName).then(user => {
				this.loading.dismiss().then(() => {
          this.viewCtrl.dismiss();  
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
    }


  }

	signup() {
		this.navCtrl.push(SignupPage);
	}

	resetPwd() {
		this.navCtrl.push(ResetpwdPage);
	}

  loginByAuth(providerId) {
    let platform = Device.platform;

    console.log("Platform: " + platform);
    if(platform == null || platform == "browser")
      this.loginByBrowser();
    else
      this.loginByDevice();
  }

  loginByBrowser() {
    var auth = this.userService.auth;
    var users = this.userService.users;
    
    var provider = new wilddog.auth.WeiboAuthProvider();   
    auth.signInWithPopup(provider).then(() => {    
      var currentUser = auth.currentUser;   
      users.child(currentUser.uid).set({   
        displayName: currentUser.displayName,    
        photoURL: currentUser.photoURL,   
        providerId: currentUser.providerId   
        });

      this.viewCtrl.dismiss().then();

      }).catch(error => {    
        console.log(error);    
      });
  }

  loginByDevice() {
    var users = this.userService.users;

    var wb = (<any>window).YCWeibo;
    wb.checkClientInstalled(() => {
      wb.ssoLogin(function(args) {
        var credential = wilddog.auth.WeiboAuthProvider.credential(args.access_token, args.userid);
        
        wilddog.auth().signInWithCredential(credential).then((user) => {
          users.child(user.uid).set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerId
          });
        }).catch((error) => {
          console.log("Wilddog after weibo sso error: " + error);
        });
      }, function(error) {
        console.log("Error: " + error);
      });
    }, () => {
      let alert = this.alertCtrl.create({
				message: 'Weibo Client Not Installed',
				buttons: [{text: "OK", role: "cancel"}]
			});
			alert.present();
    });

  }

}
