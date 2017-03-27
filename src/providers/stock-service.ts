import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { WilddogService } from './wilddog-service';

/*
  Generated class for the StockService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StockService {

	public forecasts: any; 

  public stockInfos: any;

  constructor(
    public wilddogService: WilddogService,
		private http: Http
	) {
      this.forecasts = wilddogService.db.ref("forecasts");
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



}
