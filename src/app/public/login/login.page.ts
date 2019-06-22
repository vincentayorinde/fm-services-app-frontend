import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController, AlertController } from "@ionic/angular";
import { AuthServiceService } from "../../services/auth-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  currentUser: any;
  toast: any;
  responseData: any;
  loginData = { username: "", password: "" };
  constructor(
    public authServiceService: AuthServiceService,
    private toastController: ToastController,
    public alertController: AlertController,
    private router: Router
  ) {
    if (localStorage.getItem("userData")) {
      this.currentUser = JSON.parse(localStorage.getItem("userData"));
      if (this.currentUser.userData.role == "customer") {
        this.router.navigate(["customers", "dashboard"]);
      } else if (
        this.currentUser.userData.role == "staff" ||
        this.currentUser.userData.role == "admin"
      ) {
        this.router.navigate(["staffs", "staff-dashboard"]);
      }
    }
  }

  login() {
    if (this.loginData.username && this.loginData.password) {
      //Api connections

      this.authServiceService.postData(this.loginData, "login").subscribe(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            if (this.responseData.userData.isSuspended === "1") {
              this.presentAlert("Your account has been suspended");
            } else {
              if (this.responseData.userData.role == "customer") {
                this.router.navigate(["customers", "dashboard"]);
              } else if (
                this.responseData.userData.role == "staff" ||
                this.responseData.userData.role == "admin"
              ) {
                this.router.navigate(["staffs", "staff-dashboard"]);
              }
              console.log(this.responseData);
              localStorage.setItem(
                "userData",
                JSON.stringify(this.responseData)
              );
              this.presentToast("Login successful", "success");
            }
          } else {
            this.presentToast(
              "Please give valid username and password",
              "dark"
            );
          }
        },
        err => {
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
      header: "Login Error",
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

  // login(){
  //   this.authService.login();
  // }

  // register(){
  //   this.router.navigate(['register']);
  // }
}
