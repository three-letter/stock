import { Injectable } from '@angular/core';

import * as wilddog from 'wilddog';

/*
  Generated class for the WilddogService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WilddogService {
  public db: any;

  constructor() {
  }

  init() {
    const wdConfig = {
      authDomain: "stock-forecast.wilddog.com",
      syncURL: "https://stock-forecast.wilddogio.com"
    }

    wilddog.initializeApp(wdConfig);

    this.db = wilddog.sync().ref("/");
  }

}
