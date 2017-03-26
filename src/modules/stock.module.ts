import { NgModule } from '@angular/core';
import { Platform, Events, ModalController, IonicModule } from 'ionic-angular';

import { StockService } from '../providers/stock-service';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
  ],
  providers: [StockService]
})

export class StockModule {

  constructor(
  ) {
  }


}
