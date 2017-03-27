import { NgModule } from '@angular/core';
import { Platform, Events, ModalController, IonicModule } from 'ionic-angular';

import { SummaryPage } from '../pages/stocks/summary/summary';

import { StockService } from '../providers/stock-service';

@NgModule({
  declarations: [
    SummaryPage
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    SummaryPage
  ],
  providers: [StockService]
})

export class StockModule {

  constructor(
  ) {
  }


}
