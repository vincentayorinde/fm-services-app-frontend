import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  NavController,
  AlertController,
  LoadingController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { RequestService } from "../../services/request.service";

@Component({
  selector: "app-request",
  templateUrl: "./request.page.html",
  styleUrls: ["./request.page.scss"]
})
export class RequestPage implements OnInit {
  date:any = new Date().toString();
  userID: number;
  userData: any;
  toast: any;
  serviceResponseData: any;
  customDayShortNames: '';
  public maintain: boolean;
  constructor(
    public alertController: AlertController,
    public requestService: RequestService,
    private toastController: ToastController,
    private router: Router,
    public loadingController: LoadingController
  ) {
    this.maintain = false;
  }
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  getUserData() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userData = data.userData;
    return this.userData;
  }

  requestData = {
    user_id: this.getUserData().id,
    user_name: this.getUserData().name,
    user_email: this.getUserData().email,
    service_type: "",
    maintain_type: "",
    service_priority: "",
    service_desc: "",
    start_date: "",
    end_date: "",
    tel_no: "",
    house_no: "",
    house_area: "",
    house_landmark: "",
    digital_address: "",
    city: "",
    region: "",
    status: "Not Started"
  };
  checkMaintain(){
    this.requestData.service_type === 'General Maintenance' ? this.maintain = true : this.maintain = false
  }
  request() {
    if (
      this.requestData.service_type &&
      this.requestData.service_priority &&
      this.requestData.service_desc &&
      this.requestData.start_date &&
      this.requestData.end_date &&
      this.requestData.tel_no &&
      this.requestData.house_no &&
      this.requestData.house_area &&
      this.requestData.house_landmark &&
      this.requestData.digital_address &&
      this.requestData.city &&
      this.requestData.region &&
      this.requestData.status
    ) {
      this.presentLoading();
      this.requestService.postRequest(this.requestData).subscribe(
        result => {
          this.serviceResponseData = result;
          if (this.serviceResponseData.requestData) {
            this.loadingController.dismiss();
            this.router.navigate(["customers", "dashboard"]);
            this.presentAlert("Request as be placed, We'll call you shortly");
          } else {
            this.loadingController.dismiss();
            this.presentToast("All fields are required", "dark");
          }
        },
        err => {
          this.loadingController.dismiss();
          this.presentToast("Please check the data provided", "dark");
        }
      );
    } else {
      this.presentToast("All fields are required.", "dark");
    }
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

  ngOnInit() {}
}
