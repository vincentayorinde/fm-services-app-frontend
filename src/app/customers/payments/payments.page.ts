import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  userID: number;
  public AllPaymentsData : any; 


  constructor(public paymentService: PaymentService) {
    this.getPayments(); 
   }

   getUserID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userID = data.userData.id;
    return this.userID;
  }

  getPayments(){
    this.paymentService.getPayments(this.getUserID()).subscribe((result) => {
      console.log(result);
      this.AllPaymentsData = result;
    }, (err) => {
      console.log(err);
    }) 
  }

  ngOnInit() {
  }

}
