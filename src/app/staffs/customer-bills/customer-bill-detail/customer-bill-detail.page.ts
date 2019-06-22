import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { BillService } from '../../../services/bill.service';
import { Router } from '@angular/router';

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
 

  constructor(public billService: BillService, private route: ActivatedRoute) { 
    this.getBill();

  }

  getBillID(){
    this.billId = this.route.snapshot.paramMap.get('customer-bill-detail');
    return this.billId;
  }

  getBill(){

    this.billService.getSingleBill(this.getBillID()).subscribe((result) => {

      this.singleBillData = result[0];
      
      this.billData = JSON.parse(this.singleBillData.items);
      
      this.sub_total = [];

      for(let i=0; i < this.billData.billItems.length; i++){

        this.sub_total.push(this.billData.billItems[i].qty * this.billData.billItems[i].price);
        }

    }, (err) => {
      console.log(err);
    })
  }

  ngOnInit() {
  }
 
}
