import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController, AlertController, LoadingController } from "@ionic/angular";
import { ActivateService } from "../../services/activate.service";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  currentUser: any;
  toast: any;
  responseData: any;
  activateData = { code: "", email: ""};
  constructor(
    public activateService: ActivateService,
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
  activate() {
    if (this.activateData.code) {
      this.currentUser = localStorage.getItem("activationEmail");
      this.activateData = {
        code: this.activateData.code,
        email: this.currentUser
      }
      this.presentLoading();
      this.activateService.putData(this.activateData, "activate").subscribe(
        result => {
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.userData === "done") {
                this.loadingController.dismiss();
                this.presentToast("Activation successful", "success");
                this.router.navigate(["login"]);
                localStorage.setItem("userData", JSON.stringify(this.responseData));
              } else {
            this.loadingController.dismiss();
            this.presentToast("Activation code is invalid","dark");
          }
        },
        err => {
          this.loadingController.dismiss();
          console.log('>>>>', err.message);
          this.presentToast("Connection error, Please check internet","dark");
        }
      );
    } else {
      this.presentToast("Please enter activation code.", "dark");
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

}
