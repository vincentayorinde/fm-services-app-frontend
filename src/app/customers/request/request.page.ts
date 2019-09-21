import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  AlertController,
  LoadingController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { RequestService } from "../../services/request.service";

@Component({
  selector: "app-request",
  templateUrl: "./request.page.html",
  styleUrls: ["./request.page.scss"]
})
export class RequestPage implements OnInit {
  minDate:any = new Date();
  maxDate:any = this.minDate.getFullYear()+6;
  
  userID: number;
  userData: any;
  toast: any;
  serviceResponseData: any;
  customDayShortNames: '';
  public maintain: boolean;
  public setDate: boolean;
  constructor(
    public alertController: AlertController,
    public requestService: RequestService,
    private toastController: ToastController,
    private router: Router,
    public loadingController: LoadingController
  ) {
    this.maintain = false;
    this.setDate = false;
  }
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  getUserData() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userData = data.userData;
    return this.userData;
  }

  requestData = {
    user_id: this.getUserData().id,
    user_name: this.getUserData().name,
    user_email: this.getUserData().email,
    service_type: "",
    maintain_type: "",
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
  checkMaintain(){
    this.requestData.service_type === 'General Maintenance' ? this.maintain = true : this.maintain = false
  }
  checkPriority(){
    this.requestData.service_priority === 'Routine' ? this.setDate = true : this.setDate = false
  }
  request() {
    if ( this.requestData.service_type) {
      if(this.requestData.service_type === 'General Maintenance' && !this.requestData.maintain_type) {
        this.presentToast("Please specify a General Maintenance Type", "dark");
       }else{
        if(this.requestData.service_priority) {
         if(this.requestData.service_priority === 'Routine' && !this.requestData.start_date) {
            this.presentToast("Please specify your preferred Start Date", "dark");
          }else{
            if(this.requestData.service_desc) {
                      if(this.requestData.tel_no) {
                        if(this.requestData.house_no) {
                            if(this.requestData.house_area) {
                                  if(this.requestData.house_landmark) {
                                      if(this.requestData.city){
                                          if(this.requestData.region){
                                              this.presentLoading();
                                              this.requestService.postRequest(this.requestData).subscribe(
                                                result => {
                                                  this.serviceResponseData = result;
                                                  if (this.serviceResponseData.requestData) {
                                                    this.loadingController.dismiss();
                                                    this.router.navigate(["customers", "dashboard"]);
                                                    this.presentAlert("Request as be placed, We'll call you shortly");
                                                  } else {
                                                    this.loadingController.dismiss();
                                                    this.presentToast("All fields are required", "dark");
                                                  }
                                                },
                                                err => {
                                                  this.loadingController.dismiss();
                                                  this.presentToast("Please Ensure the data provided is Valid", "dark");
                                                }
                                              );
                                          }else{
                                            this.presentToast("Please specify the Region", "dark");
                                          }
                                      }else{
                                         this.presentToast("Please provide the City", "dark");
                                      }
                                  }else{
                                    this.presentToast("Please provide the Landmark", "dark");
                                }
                            }else{
                              this.presentToast("Please provide the House Area", "dark");
                            }
                        }else{
                            this.presentToast("Please provide the House No.", "dark");
                        }
                      }else{
                        this.presentToast("Please provide the Tel No.", "dark");
                      }
              }else{
              this.presentToast("Please provide a Service Description", "dark");
            }
          }
        } else {
          this.presentToast("Please specify a Service Priority", "dark");
        }
      }
    } else {
      this.presentToast("Please specify a Service Type", "dark");
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
