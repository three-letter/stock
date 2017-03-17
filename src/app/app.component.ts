import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { WilddogService } from '../providers/wilddog-service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    public platform: Platform, 
    public wilddogService: WilddogService,
    public events: Events
  ) {
		wilddogService.init();
    
    this.subscribeEvents();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  subscribeEvents() {
    this.events.subscribe("app:root", () => {
      this.rootPage = TabsPage;
    });
  }

}
