import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController, AlertController, LoadingController } from "@ionic/angular";
import { RecoverService } from "../../services/recover.service";

@Component({
  selector: "app-recover",
  templateUrl: "./recover.page.html",
  styleUrls: ["./recover.page.scss"]
})
export class RecoverPage implements OnInit {
  currentUser: any;
  toast: any;
  responseData: any;
  recoverData = {email: ""};
  constructor(
    public recoverService: RecoverService,
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
  recover() {
    if (this.recoverData.email) {
      //Api connections
      this.presentLoading();
      this.recoverService.putData(this.recoverData, "recover").subscribe(
        result => {
          this.responseData = result;
          if (this.responseData.userData) {
            localStorage.setItem("userEmail", this.responseData.userData);
              this.loadingController.dismiss();
                console.log(this.responseData);
                this.presentToast("Check email for recovery code", "success");
                this.router.navigate(["reset-password"]);
                localStorage.setItem("userData", JSON.stringify(this.responseData));
              } else {
            this.presentToast("User not found","dark");
          }
        },
        err => {
          this.presentToast("User not found","dark");
        }
      );
    } else {
      this.presentToast("Please enter email", "dark");
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
