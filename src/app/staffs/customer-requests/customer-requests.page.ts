import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.page.html',
  styleUrls: ['./customer-requests.page.scss'],
})
export class CustomerRequestsPage implements OnInit {
  adminId: number;
  public AllServiceRequests : any; 
  constructor(public requestService: RequestService) {
    this.getAllRequests();
   }

   getAdminID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.adminId = data.userData.id;
    return this.adminId;
  }

  getAllRequests(){
    this.requestService.getGeneralRequestsForAdmin(this.getAdminID()).subscribe((result) => {
      console.log(result);
      this.AllServiceRequests = result;
    }, (err) => {
      console.log(err);
    })
  }


  ngOnInit() {
  }

}
