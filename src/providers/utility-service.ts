import { Injectable } from '@angular/core';
import { Events, ModalController, Loading, LoadingController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';


/*
  Generated class for the UtilityService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilityService {
  loading: Loading;

  constructor(
    public events: Events,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
    });
    return this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  presentToast(message: string, duration: number = 3000, position: string = 'top') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      cssClass: 'hc-toast',
      position: position
    });
    toast.present();
  }

  presentModal(page, params: Object = {}, callback?) {
    let modal = this.modalCtrl.create(page, params);
    callback && modal.onDidDismiss(callback);

    modal.present();
  }
}
