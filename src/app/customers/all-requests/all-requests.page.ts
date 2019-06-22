import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.page.html',
  styleUrls: ['./all-requests.page.scss'], 
}) 
export class AllRequestsPage implements OnInit {
  userID: number;
  public AllRequestsData : any; 
  constructor(public requestService: RequestService) {
    this.getRequests();
   }

 
  getUserID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userID = data.userData.id;
    return this.userID;
  }

  getRequests(){
    this.requestService.getRequests(this.getUserID()).subscribe((result) => {
      console.log(result);
      this.AllRequestsData = result;
    }, (err) => {
      console.log(err);
    })
  }
  ionViewWillEnter(){

  }
  ngOnInit() {
  }

}
