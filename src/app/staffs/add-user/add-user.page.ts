import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  LoadingController,
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
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }

  addUser() {
    if (
      this.userData.username &&
      this.userData.password &&
      this.userData.email &&
      this.userData.name
    ) {
      //Api connections
      this.presentLoading();
      this.authServiceService.postData(this.userData, "signup").subscribe(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            this.loadingController.dismiss();
            this.router.navigate(["staffs", "staff-dashboard"]);
            this.presentAlert("User added successfully!");
          } else {
            this.loadingController.dismiss();
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
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnInit() {}
}
