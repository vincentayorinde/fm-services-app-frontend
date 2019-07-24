import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.page.html',
  styleUrls: ['./customer-requests.page.scss'],
})
export class CustomerRequestsPage implements OnInit {
  adminId: number;
  public AllServiceRequests : any; 
  public noData: any;
  toSearch = '';
  constructor(public requestService: RequestService, private loadingController:LoadingController,  public network: Network,
    private toastController: ToastController,) {
    this.getAllRequests();
    this.presentLoading();
    this.network.onDisconnect().subscribe(() => {
      this.presentToast("Network is disconnected", "light"); 
    });
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        this.presentToast("Network is connected", "success");        
      }, 2000)
    });
   }
   presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
   getAdminID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.adminId = data.userData.id;
    return this.adminId;
  }

  getAllRequests(){
    this.requestService.getGeneralRequestsForAdmin(this.getAdminID()).subscribe((result) => {
    if(result.length > 0){
      this.loadingController.dismiss();
      this.AllServiceRequests = result;
    }else{
      this.loadingController.dismiss();
       this.noData = {"message":"No data yet"};
    }
  }, (err) => {
    this.loadingController.dismiss();
    this.presentToast("Connection error, Please check internet", "dark");
  })
  }
  search(event){
    this.toSearch = event.detail.value;
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

  ngOnInit() {
  }

}
