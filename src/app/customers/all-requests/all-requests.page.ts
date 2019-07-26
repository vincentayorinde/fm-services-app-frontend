import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.page.html',
  styleUrls: ['./all-requests.page.scss'], 
}) 
export class AllRequestsPage implements OnInit {
  userID: number;
  public AllRequestsData : any;
  public noData: any;
  toSearch = '';
  loader = '';
  constructor(
    public requestService: RequestService, 
    public loadingController: LoadingController, 
    public network: Network,
    private toastController: ToastController,
    ) {
    this.getRequests();
    this.presentLoading();
  }
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }

 
  getUserID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userID = data.userData.id;
    return this.userID;
  }

  getRequests(){
    this.requestService.getRequests(this.getUserID()).subscribe((result) => {
      if(result.length > 0){
        this.loadingController.dismiss();
        this.AllRequestsData = result;
      }else{
        this.loadingController.dismiss();
         this.noData = {"message":"No data yet"};
      }
    }, (err) => {
      this.loadingController.dismiss();
      this.presentToast("Coonection error, Please check internet", "dark");
    })
  }
  ionViewWillEnter(){

  }
  ngOnInit() {
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

}
