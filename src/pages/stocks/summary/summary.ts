import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams, ModalController } from 'ionic-angular';

import { ForecastCreatePage } from '../forecast-create/forecast-create';


import { UserService } from '../../../providers/user-service';
import { StockService } from '../../../providers/stock-service';

import * as moment from 'moment';

/*
  Generated class for the Summary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  @ViewChild("summarySlides") slides: Slides;
  public topForecastAccurates: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public userService: UserService,
    public stockService: StockService
  ) {
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
    this.fetchTopForecastAccurate();
  }

  presentForecastCreateModal() {
    if(this.userService.authOrLogin()) {
      let forecastCreateModal = this.modalCtrl.create(ForecastCreatePage);
      forecastCreateModal.present();
    }
  }

  fetchTopForecastAccurate() {
    let today = moment().format("YYYYMMDD");

    this.stockService.forecastAccurates.orderByChild("date").equalTo(today).ref().orderByChild("syncRatio").limitToFirst(3).on("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        let topForecastAccurate: {forecastAccurate?: Object, user?: Object} = {};

        topForecastAccurate.forecastAccurate = childSnapshot.val();

        this.userService.users.on("value", snapshot => {
          topForecastAccurate.user = snapshot.val();
          this.topForecastAccurates.push(topForecastAccurate);
        });
      });
    }); 
  }

}
