import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController, AlertController, LoadingController } from "@ionic/angular";
import { ResetService } from "../../services/reset.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  currentUser: any;
  toast: any;
  responseData: any;
  resetData = {code: "", password:"", rpassword: "", email: ""};
  constructor(
    public resetService: ResetService,
    private toastController: ToastController,
    public alertController: AlertController,
    private router: Router,
    public loadingController: LoadingController
  ) {}
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  reset() {
    if (this.resetData.code !== '' && this.resetData.password !== '' && this.resetData.rpassword !== '') {
      if(  this.resetData.password ==  this.resetData.rpassword){
         //Api connections
      this.presentLoading();
      this.currentUser = localStorage.getItem("userEmail");
      this.resetData.email = this.currentUser;
      delete this.resetData.rpassword;
      this.resetService.putData(this.resetData, "reset").subscribe(
        result => {
          this.responseData = result;
          if (result) {
                this.loadingController.dismiss();
                this.presentToast("Reset successful", "success");
                this.router.navigate(["login"]);
                localStorage.setItem("userData", JSON.stringify(this.responseData));
              } else {
            this.loadingController.dismiss();
            this.presentToast("Invalid code","dark");
          }
        },
        err => {
          this.loadingController.dismiss();
          this.presentToast("Invalid reset code","dark");
        }
      );
      }else{
      this.presentToast("Password does not match", "dark");
      }
    } else {
      this.presentToast("All fields are required", "dark");
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
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnInit() {}

}

