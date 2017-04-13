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
  public topForecastAccurates: Object[] = [];
  public stockIndexs: Object[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public userService: UserService,
    public stockService: StockService
  ) {
		this.fetchStockIndex();
    this.fetchTopForecastAccurates();
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
  }

  presentForecastCreateModal() {
    if(this.userService.authOrLogin()) {
      let forecastCreateModal = this.modalCtrl.create(ForecastCreatePage);
      forecastCreateModal.present();
    }
  }

  fetchStockIndex() {
    // 股指指数: 上证、深证、创业板
    let stocks = ["sh000001", "sz399001", "sz399006"];
    
    // 在当前开市时间内获取数据(非开市时，使用上一个开市日的数据)
    // 目前只能通过指数信息来获取日期(TODO: 获取当前开市日期)
    this.stockService.syncStocks(["sh000001"]).then((markDate) => {
    
      let today = markDate[0].date; 

      this.stockService.syncStocks(stocks).then((data) => {
        this.stockIndexs = [];

        stocks.forEach(stock => {
          let key = today + stock;
          this.stockService.stockPrices.child(key).once("value", snapshot => {
            let stockPrice: Object = snapshot.val();
            this.stockIndexs.push(stockPrice);
          });
        });
      });

    });

  }

  fetchTopForecastAccurates() {
    // 在当前开市时间内获取数据(非开市时，使用上一个开市日的数据)
    // 目前只能通过指数信息来获取日期(TODO: 获取当前开市日期)
    this.stockService.syncStocks(["sh000001"]).then((markDate) => {
    
      let today = "20170331"; //markDate[0].date; 

      //this.stockService.forecastAccurates.orderByChild("syncRatio").limitToFirst(5).on("value", snapshot => {
      this.stockService.forecastAccurates.orderByChild("date").equalTo(today).on("value", snapshot => {
        this.topForecastAccurates= [];

        // sort snapshot asc order to get top forecast
        let snapshot_arrs = snapshot.exportVal();
        let sort_keys = Object.keys(snapshot_arrs).sort((s1, s2) => snapshot_arrs[s1].syncRatio - snapshot_arrs[s2].syncRatio);
        let limit_snapshot = [];
        sort_keys.slice(0, 5).forEach(snapsho_key => {
          limit_snapshot.push(snapshot_arrs[snapsho_key]);
        });

			  limit_snapshot.forEach(childSnapshot => {
				  let topForecastAccurate: {forecastAccurate?: Object, user?: Object, stock?: Object} = {};

				  topForecastAccurate.forecastAccurate = childSnapshot;

				  this.userService.users.child(childSnapshot.uid).once("value", userSnapshot => {
					  topForecastAccurate.user = userSnapshot.val();
				    
            this.stockService.stockPrices.child(today + childSnapshot.stockCode).once("value", stockSnapshot => {
					    topForecastAccurate.stock = stockSnapshot.val();
					    this.topForecastAccurates.push(topForecastAccurate);

              this.topForecastAccurates.sort((t1, t2) => t1["forecastAccurate"]["syncRatio"] - t2["forecastAccurate"]["syncRatio"]);
			      });
			    });
			  });

		  }); 

    });

  }

}
