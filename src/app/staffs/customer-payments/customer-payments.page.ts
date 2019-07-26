import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.page.html',
  styleUrls: ['./customer-payments.page.scss'],
})
export class CustomerPaymentsPage implements OnInit {
  public AllPayments : any; 
  public noData: any;
  toSearch = '';
  loader;
  constructor(public paymentService: PaymentService, private loadingController:LoadingController,  public network: Network,
    private toastController: ToastController) {
    this.getAllPayments();
    this.presentLoading();
   }
   presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  getAllPayments(){
    this.paymentService.getAllPayments().subscribe((result) => {
    if(result.length > 0){
      this.loadingController.dismiss();
      this.AllPayments = result;
    }else{
      this.loadingController.dismiss();
       this.noData = {"message":"No data yet"};
    }
  }, (err) => {
    this.loadingController.dismiss();
    this.presentToast("Connection error, Please check internet", "dark");
  })
  }
  search(event){
    this.toSearch = event.detail.value;
  }
  async presentToast(msg, status) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: "top",
      color: status
    });
    toast.present();
  }

  ngOnInit() {
  }

}
 