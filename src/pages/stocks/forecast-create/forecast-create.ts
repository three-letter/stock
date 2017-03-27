import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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
  public forecast: {stockCode?: string, stockName?: string, stockTrend?: string, stockRatio?: string, reason?: string} = {}
  public _stocks: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public stockService: StockService
  ) {
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  findStocks(input) {
    let keyword = input.target.value.trim();
    this.stockService.findStocks(keyword).then(data => {
      this._stocks = data;
    });
  }


}
