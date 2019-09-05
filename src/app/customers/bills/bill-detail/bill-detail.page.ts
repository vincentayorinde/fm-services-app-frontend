import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BillService } from "../../../services/bill.service";
import { PaymentService } from "../../../services/payment.service";
import {
  ToastController,
  NavController,
  AlertController,
  LoadingController
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
  paymentMethod: any;
  public payment:any;
  public paymentData:any;

  constructor(
    public alertController: AlertController,
    private router: Router,
    public billService: BillService,
    public paymentService: PaymentService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.getBill();
    this.getBillDateForPayment();
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
  }
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  getBillID() {
    this.billId = this.route.snapshot.paramMap.get("bill-detail");
    return this.billId;
  }

  getBill() {
    this.presentLoading();
    this.billService.getSingleBill(this.getBillID()).subscribe(
      result => {
        this.loadingController.dismiss();
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

  
 

  payBill() {
    
    this.getBillforPayment = JSON.parse(
      localStorage.getItem("billDataPayment")
    );
    delete this.getBillforPayment.due_date;
    delete this.getBillforPayment.generated_at;
    delete this.getBillforPayment.items;
    delete this.getBillforPayment.paid_at;
    delete this.getBillforPayment.served_by;
    delete this.getBillforPayment.status;
    delete this.getBillforPayment.request_id;
    this.paymentData = {
      ...this.getBillforPayment,
      payment_method: this.paymentMethod
    };
    this.presentLoading();
    this.paymentService.postPayment(this.paymentData).subscribe(
      result => {
        this.loadingController.dismiss();
        this.paymentResponseData = result;
        this.router.navigate(["customers", "dashboard"]);
        this.presentAlert("Go to Menu -> Payment Instruction, to see how to pay");
      },
      err => {
        this.loadingController.dismiss();
        this.presentToast("Server error, Please check internet connection", "dark");
      }
    );
  }
  ngOnInit() {}

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: "Payment Instruction",
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
}
