import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { BillService } from '../../../services/bill.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-customer-bill-detail',
  templateUrl: './customer-bill-detail.page.html',
  styleUrls: ['./customer-bill-detail.page.scss'],
})
export class CustomerBillDetailPage implements OnInit {
  billId: any;
  public singleBillData;
  public sub_total: any;
  public billData: any;
 

  constructor(public billService: BillService, private route: ActivatedRoute, private loadingController:LoadingController,  public network: Network,
    private toastController: ToastController) { 
    this.getBill();
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

  getBillID(){
    this.billId = this.route.snapshot.paramMap.get('customer-bill-detail');
    return this.billId;
  }

  getBill(){

    this.billService.getSingleBill(this.getBillID()).subscribe((result) => {
      if(result.length > 0){
        this.loadingController.dismiss();
        this.singleBillData = result[0];
        this.billData = JSON.parse(this.singleBillData.items);
        this.sub_total = [];
        for(let i=0; i < this.billData.billItems.length; i++){
        this.sub_total.push(this.billData.billItems[i].qty * this.billData.billItems[i].price);
        }
      }else{
        this.loadingController.dismiss();
        this.presentToast("Connection error, Please check internet", "dark");
      }
      }, (err) => {
        this.loadingController.dismiss();
        this.presentToast("Connection error, Please check internet", "dark");
    })
  }
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
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
