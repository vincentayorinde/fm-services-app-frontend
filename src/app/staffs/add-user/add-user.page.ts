import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  NavController,
  AlertController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../services/auth-service.service";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.page.html",
  styleUrls: ["./add-user.page.scss"]
})
export class AddUserPage implements OnInit {
  toast: any;
  responseData: any;
  userData = {
    username: "",
    password: "",
    email: "",
    name: "",
    role: ""
  };
  constructor(
    public authServiceService: AuthServiceService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router,
    private alertController: AlertController
  ) {}
  addUser() {
    if (
      this.userData.username &&
      this.userData.password &&
      this.userData.email &&
      this.userData.name
    ) {
      //Api connections

      this.authServiceService.postData(this.userData, "signup").subscribe(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            this.router.navigate(["staffs", "staff-dashboard"]);
            this.presentAlert("User added successfully!");
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
