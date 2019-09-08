import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RequestService } from '../../../services/request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  requestId: any;
  public singleRequestData : any;
  public singleRequestBillData : any;
  public userDetails: any;
  public not_applicable: any;
  public newStartDate;
  public newEndDate;
  public newDateAdded;

  constructor(public requestService: RequestService, private route: ActivatedRoute, public loadingController: LoadingController,  ) { 
    this.presentLoading();
    this.getRequest();
    this.getRequestBill();
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }
  presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
  }
  getRequestID(){
    this.requestId = this.route.snapshot.paramMap.get('request-detail');
    return this.requestId;
  }

   getRequest(){
    this.requestService.getSingleRequest(this.getRequestID()).subscribe((result) => {
      this.singleRequestData = result[0];
      this.newDateAdded =  moment(this.singleRequestData.date_added).format('MMMM Do YYYY hh:mm a')
      this.newStartDate =  moment(this.singleRequestData.start_date).format('MMMM Do YYYY hh:mm a')
      this.newEndDate =  moment(this.singleRequestData.end_date).format('MMMM Do YYYY hh:mm a')
      this.loadingController.dismiss();
    }, (err) => {
      console.log(err);
    })
  }

  getRequestBill(){
    this.requestService.getSingleRequestBill(this.getRequestID()).subscribe((result) => {
      this.singleRequestBillData = result[0];
    }, (err) => {
      console.log(err);
    })
  }

  viewBill(){

  }

  ngOnInit() {
  }

}
