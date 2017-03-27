import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { WilddogService } from './wilddog-service';

/*
  Generated class for the StockService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StockService {
  headers: Headers;
  requestOptions: RequestOptions;

	public forecasts: any; 

  public stockInfos: any;

  constructor(
    public wilddogService: WilddogService,
		private http: Http
	) {
      this.forecasts = wilddogService.db.ref("forecasts");
      this.headers = new Headers({'charset': 'gb2312'});
      this.requestOptions = new RequestOptions({headers: this.headers});
  }

	findStocks(q) {
		let url = "http://smartbox.gtimg.cn/s3/?t=gp&q=" + q;
		return new Promise((resolve, reject) => {  
      this.http.get(url, this.requestOptions).subscribe(data => {
			  let result = [];
			  let body = data.text();
			  let v_hints = /v_hint="(.+?)"/g.exec(body)
			  if(v_hints != null) {
				  let v_hint = v_hints[1];
				  let values = v_hint.split(/~GP-[A|B]\^/);	
				  values.forEach(val => {
					  if(val) {
						  let line = val.split('~');
						  if(line.length > 3) {
							  result.push({
								  city:line[0],
								  codeS:line[1],
								  name:line[2],
								  code:line[0]+line[1]
							  });
						  }
					  }
				  });
				  this.stockInfos = result;
				  console.log("find stocks: " + this.stockInfos);
          resolve(result);
			  } else {
          reject("404");
        } 
		  });
    });
	}

}
