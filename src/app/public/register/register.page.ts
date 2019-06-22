import { Component, OnInit } from "@angular/core";
import { ToastController, NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../services/auth-service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  toast: any;
  responseData: any;
  userData = {
    username: "",
    password: "",
    email: "",
    name: "",
    role: "customer"
  };

  constructor(
    public authServiceService: AuthServiceService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  signup() {
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
            this.router.navigate(["login"]);
            console.log(this.responseData);
            this.presentToast("Please, you can now login", "success");
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

  ngOnInit() {}
}
