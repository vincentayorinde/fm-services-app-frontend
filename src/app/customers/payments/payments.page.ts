import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  userID: number;
  public AllPaymentsData : any; 
  public noData: any;
  toSearch = '';

  constructor(public paymentService: PaymentService, private loadingController: LoadingController, private toastController: ToastController) {
    this.getPayments(); 
    this.presentLoading();
   }
   presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
   getUserID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userID = data.userData.id;
    return this.userID;
  }

  getPayments(){
    this.paymentService.getPayments(this.getUserID()).subscribe((result) => {
    if(result.length > 0){
      this.loadingController.dismiss();
      this.AllPaymentsData = result;
    }else{
      this.loadingController.dismiss();
      this.noData = {"message":"No data yet"};
    }
  }, (err) => {
    this.loadingController.dismiss();
    this.presentToast("Coonection error, Please check internet", "dark");
  })
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
  search(event){
    this.toSearch = event.detail.value;
  }
  ngOnInit() {
  }

}
