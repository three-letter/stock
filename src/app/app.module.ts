import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/users/login/login';
import { SignupPage } from '../pages/users/signup/signup';
import { ResetpwdPage } from '../pages/users/resetpwd/resetpwd';

import { UserService } from '../providers/user-service'
import { WilddogService } from '../providers/wilddog-service'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginPage,
    SignupPage,
    ResetpwdPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginPage,
    SignupPage,
    ResetpwdPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UserService, WilddogService]
})
export class AppModule {}
