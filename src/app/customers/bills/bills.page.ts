import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service'; 
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
  userID: number;
  public noData: any;
  toSearch = '';
  public AllBillsData : any;
  constructor(public billService: BillService,  private loadingController: LoadingController, private toastController: ToastController) {
    this.getBills();
    this.presentLoading();
    localStorage.removeItem('billDataPayment');
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

  getBills(){
    this.billService.getBills(this.getUserID()).subscribe((result) => {
      if(result.length > 0){
        this.loadingController.dismiss();
        this.AllBillsData = result;
      }else{
        this.loadingController.dismiss();
        this.noData = {"message":"No data yet"};
      }
    }, (err) => {
      this.loadingController.dismiss();
      this.presentToast("Coonection error, Please check internet", "dark");
    })
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
  search(event){
    this.toSearch = event.detail.value;
  }
  ngOnInit() {
  }

}
