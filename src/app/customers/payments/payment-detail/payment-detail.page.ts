import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {
  paymentId: any;
  public singlePaymentData : any;
  public userDetails: any;
  public paymentData: any;
  public paidAt;


  constructor(public paymentService: PaymentService, private loadingController: LoadingController, private route: ActivatedRoute) {
    this.getPayment();
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
   }
   presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  getPaymentID(){
    this.paymentId = this.route.snapshot.paramMap.get('payment-detail');
    return this.paymentId;
  }

  getPayment(){
    this.presentLoading();    
    this.paymentService.getSinglePayment(this.getPaymentID()).subscribe((result) => {
      this.loadingController.dismiss();
      this.singlePaymentData = result[0];
      this.paidAt =  moment(this.singlePaymentData.paid_at).format('MMMM Do YYYY hh:mm a')

     
    }, (err) => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
