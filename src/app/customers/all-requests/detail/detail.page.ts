import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { RequestService } from '../../../services/request.service';

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

  constructor(public requestService: RequestService, private route: ActivatedRoute ) { 
    this.getRequest();
    this.getRequestBill();
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }
 
  getRequestID(){
    this.requestId = this.route.snapshot.paramMap.get('request-detail');
    return this.requestId;
  }

   getRequest(){
    this.requestService.getSingleRequest(this.getRequestID()).subscribe((result) => {
      this.singleRequestData = result[0];
    }, (err) => {
      console.log(err);
    })
  }

  getRequestBill(){
    this.requestService.getSingleRequestBill(this.getRequestID()).subscribe((result) => {
      this.singleRequestBillData = result[0];
      console.log(this.singleRequestBillData);
    }, (err) => {
      console.log(err);
    })
  }

  viewBill(){

  }

  ngOnInit() {
  }

}
