import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { StockService } from '../../providers/stock-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public stockService: StockService
  ) {
		this.stockService.findStocks("ry");
		setTimeout(() => {
			console.log("api: " + this.stockService.stockInfos);
		}, 500);
  }

}
