import { NgModule } from '@angular/core';
import { Platform, Events, ModalController, IonicModule } from 'ionic-angular';

import { SummaryPage } from '../pages/stocks/summary/summary';
import { ForecastCreatePage } from '../pages/stocks/forecast-create/forecast-create';

import { StockService } from '../providers/stock-service';

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
  ) {
  }


}
