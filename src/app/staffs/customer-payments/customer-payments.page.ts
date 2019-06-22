import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.page.html',
  styleUrls: ['./customer-payments.page.scss'],
})
export class CustomerPaymentsPage implements OnInit {
  public AllPayments : any; 

  constructor(public paymentService: PaymentService) {
    this.getAllPayments();
   }

  getAllPayments(){
    this.paymentService.getAllPayments().subscribe((result) => {
      console.log(result);
      this.AllPayments = result;
    }, (err) => {
      console.log(err);
    }) 
  }


  ngOnInit() {
  }

}
 