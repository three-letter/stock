import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { UserService } from '../../../providers/user-service';
import { StockService } from '../../../providers/stock-service';

/*
  Generated class for the ForecastCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forecast-create',
  templateUrl: 'forecast-create.html'
})
export class ForecastCreatePage {
	@ViewChild("stockCode") stockCodeInput: any;

  public forecast: {uid?: string, stockCode?: string, stockName?: string, stockTrend?: string, stockRatio?: string, reason?: string, stockCodeName?: string} = {}
  public _stocks: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userService: UserService,
    public stockService: StockService
  ) {
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

	forecastCreateHandler(ngForm) {
		if(this.userService.authOrLogin()) {
			this.forecast.uid = this.userService.auth.currentUser.uid;
			this.stockService.forecasts.push(this.forecast).then((newForecast) => {
				console.log("forecast create success:" + newForecast.key());
				this.viewCtrl.dismiss();
			}).catch(error => {
				console.log("forecast create fail:" + error.code);
			});
		} 
	}

  findStocks(input) {
    let keyword = input.target.value.trim();
    this.stockService.findStocks(keyword).then(data => {
      this._stocks = data;
    });
  }

	selectStock(item) {
		this.forecast.stockCode = item.codeS;
		this.forecast.stockName = item.name;
		this.forecast.stockCodeName = item.codeName;
		console.log(this.forecast);
		this._stocks = [];
	}


}
