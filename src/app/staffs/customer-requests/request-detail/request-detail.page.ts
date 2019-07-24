import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestService } from "../../../services/request.service";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: "app-request-detail",
  templateUrl: "./request-detail.page.html",
  styleUrls: ["./request-detail.page.scss"]
})
export class RequestDetailPage implements OnInit {
  userName: any;
  requestId: any;
  public singleRequestData: any;
  public updateRequestStatus: any;
  public endRequestStatus: any;
  public userDetails: any;

  constructor(
    public requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController:LoadingController,  
    public network: Network,
    private toastController: ToastController,
  ) {
    this.getRequest();
    this.getRequestID();
    this.getRequestForBillID();
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
  getRequestID() {
    this.requestId = this.route.snapshot.paramMap.get("request-detail");
    return this.requestId;
  }
  getRequestForBillID() {
    this.requestId = this.route.snapshot.paramMap.get(
      "create-bill/create-bill"
    );
    return this.requestId;
  }

  getUserName() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userName = data.userData.name;
    return this.userName;
  }

  getRequest() {
    this.requestService.getSingleRequest(this.getRequestID()).subscribe(
      result => {
        this.loadingController.dismiss();
        this.singleRequestData = result[0];
      },
      err => {
        this.loadingController.dismiss();
        this.presentToast("Connection error, Please check internet", "dark");
      }
    );
  }

  updateData = {
    served_by: this.getUserName(),
    status: "On Going"
  };
  endData = {
    status: "Completed"
  };

  startJob() {
    this.presentLoading();
    this.requestService
      .updateRequestStatus(this.getRequestID(), this.updateData)
      .subscribe(
        result => {
          this.loadingController.dismiss();
          this.router.navigate(["staffs", "staff-dashboard"]);
          this.presentAlert("Job started successfully!");
        },
        err => {
          this.loadingController.dismiss();
          this.presentToast("Connection error, Please check internet", "dark");
        }
      );
  }
  endJob() {
    this.presentLoading();
    this.requestService
      .endRequestStatus(this.getRequestID(), this.endData)
      .subscribe(
        result => {
          this.loadingController.dismiss();
          this.router.navigate(["staffs", "staff-dashboard"]);
          this.presentAlert("Job Completed!");
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
  generateBill() {}

  ngOnInit() {}
}
