import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-customer-bills',
  templateUrl: './customer-bills.page.html',
  styleUrls: ['./customer-bills.page.scss'],
})
export class CustomerBillsPage implements OnInit {
  public AllBills: any;
  public noData: any;
  loader;
  toSearch = '';
  constructor(public billService: BillService, private loadingController:LoadingController,  public network: Network,
    private toastController: ToastController) {
    this.getAllBills();
    this.presentLoading();

   }
   presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }

  getAllBills(){
    this.billService.getAllBills().subscribe((result) => {
    if(result.length > 0){
      this.loadingController.dismiss();
      this.AllBills = result;
      console.log('all bills', this.AllBills);
    }else{
      this.loadingController.dismiss();
       this.noData = {"message":"No data yet"};
    }
  })
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
