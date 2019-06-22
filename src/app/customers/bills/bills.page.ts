import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service'; 


@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
  userID: number;
  public AllBillsData : any; 
  constructor(public billService: BillService) {
    this.getBills();
    localStorage.removeItem('billDataPayment');
  } 

  getUserID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userID = data.userData.id;
    return this.userID;
  }

  getBills(){
    this.billService.getBills(this.getUserID()).subscribe((result) => {
      console.log(result);
      this.AllBillsData = result;
    }, (err) => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
