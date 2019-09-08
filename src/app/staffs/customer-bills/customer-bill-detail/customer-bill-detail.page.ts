import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { BillService } from '../../../services/bill.service';
import { LoadingController, ToastController } from "@ionic/angular";
import { Network } from '@ionic-native/network/ngx';
import * as moment from 'moment';

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
  public generatedAt;
 

  constructor(public billService: BillService, private route: ActivatedRoute, private loadingController:LoadingController,  public network: Network,
    private toastController: ToastController) { 
    this.getBill();
    this.presentLoading();
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
        this.generatedAt =  moment(this.singleBillData.generated_at).format('MMMM Do YYYY hh:mm a')

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
