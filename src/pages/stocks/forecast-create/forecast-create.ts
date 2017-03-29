import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { UserService } from '../../../providers/user-service';
import { StockService } from '../../../providers/stock-service';
import { UtilityService } from '../../../providers/utility-service';

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

  public forecast: {uid?: string, stockSmallCode?: string, stockCode?: string, stockName?: string, stockTrend?: string, stockRatio?: string, reason?: string, stockCodeName?: string, date?: number} = {}
  public _stocks: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userService: UserService,
    public stockService: StockService,
    public utilityService: UtilityService
  ) {
    }

  dismissModal() {
    this.viewCtrl.dismiss().catch(() => {});
  }

	forecastCreateHandler(ngForm) {
		if(this.userService.authOrLogin()) {
      this.utilityService.presentLoading();
      let now = new Date();
      now.setHours(0,0,0,0);

			this.forecast.uid = this.userService.auth.currentUser.uid;
      this.forecast.date = now.getTime(); 

			this.stockService.forecasts.push(this.forecast).then((newForecast) => {
        this.utilityService.dismissLoading();
        this.utilityService.presentToast("今日预测成功!");
				this.dismissModal();
			}).catch(error => {
        this.utilityService.dismissLoading();
        this.utilityService.presentToast("系统繁忙，请稍后再试...");
				this.dismissModal();
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
		console.log(item);
		this.forecast.stockCode = item.code;
		this.forecast.stockSmallCode = item.codeS;
		this.forecast.stockName = item.name;
		this.forecast.stockCodeName = item.codeName;
		this._stocks = [];
	}


}
