import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage} from '@ionic/storage';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

import { UserModule } from  '../modules/user.module';
import { StockModule } from  '../modules/stock.module';

import { WilddogService } from '../providers/wilddog-service';
import { UtilityService } from '../providers/utility-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    UserModule,
		StockModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, WilddogService, Storage, UtilityService]
})
export class AppModule {}
