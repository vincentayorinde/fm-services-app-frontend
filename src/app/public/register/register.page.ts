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
    rpassword: "",
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
    if (this.userData.username && this.userData.password && this.userData.rpassword && this.userData.email && this.userData.name ) {
      if( this.userData.password === this.userData.rpassword ){
      this.presentLoading();
      this.authServiceService.postData(this.userData, "signup").subscribe(
        result => {
          this.responseData = result;
          if( !this.responseData.error ){
            if (this.responseData.userData.token) {
              localStorage.setItem("activationEmail", this.responseData.userData.email);
              this.loadingController.dismiss();
              this.router.navigate(["verify"]);
              this.presentToast("Please, check email for activation code", "success");
            } else {
              this.loadingController.dismiss();
              this.presentToast("Username or Email already exists","dark");
            }
          }else{
            this.loadingController.dismiss();
            this.presentToast(this.responseData.error, "dark");
          }
        },
        err => {
          this.loadingController.dismiss();
          this.presentToast("Coonection error, Please check internet", "dark");
        }
      );
      } else {
        this.presentToast("Passwords do not match", "dark");
      }
    } else {
      this.presentToast("All fields are required", "dark");
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
