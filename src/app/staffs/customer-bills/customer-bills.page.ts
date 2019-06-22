import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-customer-bills',
  templateUrl: './customer-bills.page.html',
  styleUrls: ['./customer-bills.page.scss'],
})
export class CustomerBillsPage implements OnInit {
  public AllBills: any;

  constructor(public billService: BillService) {
    this.getAllBills();
   }


  getAllBills(){
    this.billService.getAllBills().subscribe((result) => {
      console.log(result);
      this.AllBills = result;
    }, (err) => {
      console.log(err);
    })
  }
  ngOnInit() {
  }

}
