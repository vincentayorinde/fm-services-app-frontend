import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.page.html',
  styleUrls: ['./all-requests.page.scss'], 
}) 
export class AllRequestsPage implements OnInit {
  userID: number;
  public AllRequestsData : any; 
  public loader: any;
  public noData: any;
  toSearch = '';
  constructor(public requestService: RequestService, public loadingController: LoadingController) {
    this.getRequests();
    this.presentLoading();
   }
    presentLoading =  async () =>  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    this.loader = await loading.present();
  }

 
  getUserID(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userID = data.userData.id;
    return this.userID;
  }

  getRequests(){
    this.requestService.getRequests(this.getUserID()).subscribe((result) => {
      if(result.length > 0){
        this.AllRequestsData = result;
      }else{
         this.noData = {"message":"No data yet"};
      }
    }, (err) => {
      console.log(err);
    })
  }
  ionViewWillEnter(){

  }
  ngOnInit() {
  }
  search(event){
    this.toSearch = event.detail.value;
  }

}
