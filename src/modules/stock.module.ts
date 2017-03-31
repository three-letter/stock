import { NgModule } from '@angular/core';
import { Platform, Events, ModalController, IonicModule } from 'ionic-angular';

import { SummaryPage } from '../pages/stocks/summary/summary';
import { ForecastCreatePage } from '../pages/stocks/forecast-create/forecast-create';

import { StockService } from '../providers/stock-service';

import * as moment from 'moment';

@NgModule({
  declarations: [
    SummaryPage,
    ForecastCreatePage
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    SummaryPage,
    ForecastCreatePage
  ],
  providers: [StockService]
})

export class StockModule {

  constructor(
    public stockService: StockService
  ) {
      this.listenStockForecasts();
      this.listenStockPrices();
  }

  listenStockForecasts() {
		let now = moment().format("YYYYMMDD");

    this.stockService.forecasts.orderByChild("date").equalTo(now).on("child_added", (snapshot, prev) => {
     
      let forecastInfo = snapshot.val();
      let code = forecastInfo.stockCode;

      this.stockService.syncStocks([code]).then(() => {
      });
    });
  }

  listenStockPrices() {
		let now = moment().format("YYYYMMDD");

    this.stockService.stockPrices.orderByChild("date").equalTo(now).on("child_added", (snapshot, prev) => {
      
			// 获取最新股票涨幅数据
      let stockPrice = snapshot.exportVal();
      let code = stockPrice.code;
      let realRatio = parseFloat(stockPrice.ratio);
      let today = moment(stockPrice.time, "YYYYMMDDHHmmss").format("YYYYMMDD");
      
      // 根据用户的预测涨幅计算当前预测的准确率
      this.stockService.forecasts.orderByChild("stockCode").equalTo(code).on("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          let forecastInfo = childSnapshot.val();

          if(forecastInfo.date != today)
            return;

          let realForecastRatio = parseFloat(forecastInfo.realStockRatio);
          let syncRatio = this.stockService.calculateForecastRatio(realForecastRatio, realRatio);
      
          let forecastAccurate = childSnapshot.exportVal();
          forecastAccurate.syncRatio = syncRatio;
          let key = forecastInfo.uid + forecastInfo.stockCode + today;

          this.stockService.forecastAccurates.child(key).set(forecastAccurate).then(() => {
          }).catch(error => {
          });

        });
      });

    });
  }


}
