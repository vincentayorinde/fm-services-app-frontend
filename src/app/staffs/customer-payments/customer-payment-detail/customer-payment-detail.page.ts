import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../../../services/payment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';
import * as moment from 'moment';
@Component({
  selector: "app-customer-payment-detail",
  templateUrl: "./customer-payment-detail.page.html",
  styleUrls: ["./customer-payment-detail.page.scss"]
})
export class CustomerPaymentDetailPage implements OnInit {
  paymentId: any;
  public singlePaymentData: any;
  public paymentMade: any;
  public adminUser: any;
  public updatePayment: object;
  public paidAt;
  constructor(
    public paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private loadingController:LoadingController,  
    public network: Network,
    private toastController: ToastController,
  ) {
    this.adminUser = localStorage.getItem("userData");
    this.adminUser = JSON.parse(this.adminUser);

    this.getPayment();
    this.presentLoading();
  }
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  getPaymentID() {
    this.paymentId = this.route.snapshot.paramMap.get(
      "customer-payment-detail"
    );
    return this.paymentId;
  }
  getPayment() {
    this.paymentService.getSinglePayment(this.getPaymentID()).subscribe(
      result => {
        this.loadingController.dismiss();
        this.singlePaymentData = result[0];
        this.paidAt =  moment(this.singlePaymentData.paid_at).format('MMMM Do YYYY hh:mm a')

        if(this.singlePaymentData){
          return this.singlePaymentData;
        }
      },
      err => {
        this.loadingController.dismiss();
        this.presentToast("Connection error, Please check internet", "dark");
      }
    );
  }

  
  confirmPayment() {
  this.presentLoading();
  this.updatePayment = {
    approval: "Confirmed",
    user_email: this.singlePaymentData.user_email,
    user_name: this.singlePaymentData.user_name,
    amount: this.singlePaymentData.amount,
    service_type: this.singlePaymentData.service_type,
    maintain_type: this.singlePaymentData.maintain_type,
    payment_method: this.singlePaymentData.payment_method,
    paid_at: this.singlePaymentData.paid_at,
  };
    this.paymentService
      .confirmPayment(this.getPaymentID(), this.updatePayment)
      .subscribe(
        result => {
          if(result){
            this.loadingController.dismiss();
            this.presentAlert("Payment approved successfully!");
            this.router.navigate(["staffs", "staff-dashboard"]);
          }else{
            this.loadingController.dismiss();
            this.presentToast("Connection error, Please check internet", "dark");
          }
        },
        err => {
          this.loadingController.dismiss();
          this.presentToast("Connection error, Please check internet", "dark");
        }
      );
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: "Great!",
      message: msg,
      buttons: [
        {
          text: "Okay",
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
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
  ngOnInit() {}
}
