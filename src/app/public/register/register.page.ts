import { Component, OnInit } from "@angular/core";
import { ToastController, NavController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../services/auth-service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  loading: any;
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
    private router: Router,
    public loadingController: LoadingController
  ) {}
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  signup() {
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
            localStorage.setItem("activationEmail", this.responseData.userData.email);
            this.loadingController.dismiss();
            this.router.navigate(["verify"]);
            // this.router.navigate(["login"]);
            console.log(this.responseData);
            this.presentToast("Please, check email for activation code", "success");
          } else {
            this.presentToast(
              "Please give valid username and password",
              "dark"
            );
          }
        },
        err => {
          console.log('>>>>>', err.message);
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
      duration: 5000,
      position: "top",
      color: status
    });
    toast.present();
  }

  ngOnInit() {}
}
