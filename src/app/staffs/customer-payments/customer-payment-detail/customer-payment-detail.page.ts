import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../../../services/payment.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ToastController,
  NavController,
  AlertController
} from "@ionic/angular";
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
    private toastController: ToastController
  ) {
    this.adminUser = localStorage.getItem("userData");
    this.adminUser = JSON.parse(this.adminUser);

    console.log(this.adminUser);
    this.getPayment();
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
        this.singlePaymentData = result[0];

        console.log(this.singlePaymentData);
      },
      err => {
        console.log(err);
      }
    );
  }

  updatePayment = {
    approval: "Confirmed"
  };
  confirmPayment() {
    console.log(this.updatePayment);
    this.paymentService
      .confirmPayment(this.getPaymentID(), this.updatePayment)
      .subscribe(
        result => {
          this.router.navigate(["staffs", "staff-dashboard"]);
          this.presentAlert("Payment approved successfully!");
        },
        err => {
          console.log(err);
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
  ngOnInit() {}
}
