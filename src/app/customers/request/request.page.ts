import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  NavController,
  AlertController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { RequestService } from "../../services/request.service";

@Component({
  selector: "app-request",
  templateUrl: "./request.page.html",
  styleUrls: ["./request.page.scss"]
})
export class RequestPage implements OnInit {
  userID: number;
  userName: any;
  toast: any;
  serviceResponseData: any;

  constructor(
    public alertController: AlertController,
    public requestService: RequestService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {}
  getUserID() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userID = data.userData.id;
    return this.userID;
  }
  getUserName() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userName = data.userData.name;
    return this.userName;
  }

  requestData = {
    user_id: this.getUserID(),
    user_name: this.getUserName(),
    service_type: "",
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
      this.requestService.postRequest(this.requestData).subscribe(
        result => {
          this.serviceResponseData = result;
          if (this.serviceResponseData.requestData) {
            console.log(this.serviceResponseData);

            this.router.navigate(["customers", "dashboard"]);
            this.presentAlert("Request as be placed, We'll call you shortly");
          } else {
            this.presentToast(
              "Please give valid username and password",
              "dark"
            );
          }
        },
        err => {
          console.log(err);
          this.presentToast("Please check the data provided", "dark");
        }
      );
    } else {
      this.presentToast("Give valid information.", "dark");
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
            console.log("Okay");
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {}
}
