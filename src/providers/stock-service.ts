import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { WilddogService } from './wilddog-service';

import * as moment from 'moment';

/*
  Generated class for the StockService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StockService {

	public forecasts: any; 
  public stockPrices: any;
  public forecastAccurates: any;

  public stockInfos: any;

  constructor(
    public wilddogService: WilddogService,
		private http: Http
	) {
      this.forecasts = wilddogService.db.ref("forecasts");
      this.stockPrices = wilddogService.db.ref("stockPrices");
      this.forecastAccurates = wilddogService.db.ref("forecastAccurates");
  }

	findStocks(q) {
		let url = "http://smartbox.gtimg.cn/s3/?t=gp&q=" + q;
		return new Promise((resolve, reject) => { 

      //this.http.get(url).subscribe(data => {
			this.getScript(url).then(() => {
			  let result = [];
			  let body = (<any>window).v_hint;//data.text();
			  if(body != null) {
				  let values = body.split(/~GP-[A|B]\^/);	
				  values.forEach(val => {
					  if(val) {
						  let line = val.split('~');
						  if(line.length > 3) {
							  result.push({
								  city:line[0],
								  codeS:line[1],
								  name:line[2],
								  code:line[0]+line[1],
									codeName:line[1]+' '+line[2]
							  });
						  }
					  }
				  });
				  this.stockInfos = result;
          resolve(result);
			  } else {
          reject("404");
        } 
		  });
    });
	}

  syncStocks(codes) {
    let url = "http://qt.gtimg.cn/q=";
    url = url + codes.join(",") + ","

    return new Promise((reslove, reject) => {
    
      this.getScript(url).then(() => {
        codes.forEach(code => {
          let codeInfoKey = "v_" + code;
          let codeInfo = (<any>window)[codeInfoKey];

          if(codeInfo != null) {
            let codeInfos = codeInfo.split('~');
            let stockInfo = {
              code: code,
              name: codeInfos[1],
              close: parseFloat(codeInfos[3]),
              last: parseFloat(codeInfos[4]),
              open: parseFloat(codeInfos[5]),
              high: codeInfos[33],
              low: codeInfos[34],
              ratio: this.calculateRatio(parseFloat(codeInfos[3]), parseFloat(codeInfos[4])),
              time: codeInfos[30],
							date: codeInfos[30].slice(0, 8)
            };

            let key = codeInfos[30].slice(0,8) + code;
            this.stockPrices.child(key).set(stockInfo).then(() => {
            }).catch(error => {
              console.log("add stock price fail");
            });

          }
        });
        reslove(codes);
      });
    
    });
  }

	getScript(url){
	  let promise = new Promise(function(resolve, reject){
		var elem=document.createElement('script'),
			handler=function(e){
				elem.parentNode.removeChild(elem);
				handler=null;
				if ( e && e.type === "error") {
					reject(e.type);
				}
				resolve(e.type);
			};
			elem.src=url;
			elem.charset='gb2312';
			elem.addEventListener('load',handler);
			elem.addEventListener('error',handler);
			document.head.appendChild(elem);
		});
		return promise;
	}

  calculateRatio(close, last) {
    let ratioSymbol = close > last ? "+" : (close == last ? "" : "-");
    let ratioValue = parseFloat(Math.abs((close - last) * 100 / last).toFixed(2));
    let ratio = ratioSymbol == "-" ? (0 - ratioValue) : ratioValue;
    //预测的时候便于拖动，采用的是0-1000（也就是100倍）
    ratio = ratio * 100; 
    
    return ratio;
  }

  calculateForecastRatio(forecastRatio, realRatio) {
    let ratio = Math.abs(forecastRatio - realRatio).toFixed(2);
    let syncRatio = parseFloat(ratio);

    return syncRatio;
  }

  // helper method in html
  // like model virtual attrubites

  trend(stockPrice) {
    let close = stockPrice.close;
    let last = stockPrice.last;

    return close > last ? 1 : (close == last ? 0 : -1);
  }

  trendColor(stockPrice) {
    let trend = this.trend(stockPrice);
    return trend > -1 ? (trend == 0 ? "gray" : "red") : "green"; 
  }



}
