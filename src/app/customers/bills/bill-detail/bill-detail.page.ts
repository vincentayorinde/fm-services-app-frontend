import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BillService } from "../../../services/bill.service";
import { PaymentService } from "../../../services/payment.service";
import {
  ToastController,
  NavController,
  AlertController
} from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.page.html",
  styleUrls: ["./bill-detail.page.scss"]
})
export class BillDetailPage implements OnInit {
  billId: any;
  public singleBillData;
  public userDetails: any;
  public billData: any;
  public sub_total: any;
  public paymentResponseData: any;
  public BillDataForPayment: any;
  public getBillforPayment: any;
  userName: any;
  userId: any;
  public service_type;

  constructor(
    public alertController: AlertController,
    private router: Router,
    public billService: BillService,
    public paymentService: PaymentService,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.getBill();
    this.getBillDateForPayment();
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    // const paymentData_ = console.log(paymentData_);
    // this.getBillforPayment = paymentData_;
  }

  getBillID() {
    this.billId = this.route.snapshot.paramMap.get("bill-detail");
    return this.billId;
  }

  getBill() {
    this.billService.getSingleBill(this.getBillID()).subscribe(
      result => {
        this.singleBillData = result[0];

        this.billData = JSON.parse(this.singleBillData.items);

        this.sub_total = [];

        for (let i = 0; i < this.billData.billItems.length; i++) {
          this.sub_total.push(
            this.billData.billItems[i].qty * this.billData.billItems[i].price
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  getUserName() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userName = data.userData.name;
    return this.userName;
  }
  getUserId() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userId = data.userData.id;
    return this.userId;
  }
  getBillDateForPayment() {
    this.billService.getSingleBill(this.getBillID()).subscribe(result => {
      this.BillDataForPayment = result[0];
      if (this.BillDataForPayment.status !== "Paid") {
        localStorage.setItem(
          "billDataPayment",
          JSON.stringify(this.BillDataForPayment)
        );
      }
    });
  }

  paymentData = {
    user_name: this.getUserName(),
    payment_method: ""
  };

  payBill() {
    this.getBillforPayment = JSON.parse(
      localStorage.getItem("billDataPayment")
    );
    console.log("Bill details", this.getBillforPayment);
    delete this.getBillforPayment.due_date;
    delete this.getBillforPayment.generated_at;
    delete this.getBillforPayment.items;
    delete this.getBillforPayment.paid_at;
    delete this.getBillforPayment.served_by;
    delete this.getBillforPayment.status;
    delete this.getBillforPayment.request_id;

    // this.presentAlert(
    //   "Momo No. 0540001112 - Name: FM Services - Use bill no as Ref "
    // );

    this.paymentService.postPayment(this.getBillforPayment).subscribe(
      result => {
        this.paymentResponseData = result;
        console.log(this.paymentResponseData);
        this.router.navigate(["customers", "dashboard"]);
        this.presentAlert(
          "Momo No. 0540001112 - Name: FM Services - Use bill no as Ref "
        );
      },
      err => {
        console.log(err);
        this.presentToast("Please check the data provided", "dark");
      }
    );
  }
  ngOnInit() {}

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: "Send Momo to",
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
}
