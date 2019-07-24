import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../../../services/payment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';
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

    console.log(this.adminUser);
    this.getPayment();
    this.presentLoading();
    this.network.onDisconnect().subscribe(() => {
      this.presentToast("Network is disconnected", "light"); 
    });
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        this.presentToast("Network is connected", "success");        
      }, 2000)
    });
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
        console.log(this.singlePaymentData);
      },
      err => {
        this.loadingController.dismiss();
        this.presentToast("Connection error, Please check internet", "dark");
      }
    );
  }

  updatePayment = {
    approval: "Confirmed"
  };
  confirmPayment() {
    this.paymentService
      .confirmPayment(this.getPaymentID(), this.updatePayment)
      .subscribe(
        result => {
          this.loadingController.dismiss();
          this.router.navigate(["staffs", "staff-dashboard"]);
          this.presentAlert("Payment approved successfully!");
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
            console.log("Okay");
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
