import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
  }

}
