import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public userDetails: any;
  currentUser: any;
  constructor(public alertController: AlertController, private router: Router) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    if(localStorage.getItem('userData')){
      this.currentUser = JSON.parse(localStorage.getItem('userData'));
        if(this.currentUser.userData.role == 'customer'){
          this.router.navigate(['customers','dashboard']);
        }else if(this.currentUser.userData.role == 'staff' || this.currentUser.userData.role == 'admin' ){
          this.router.navigate(['staffs','staff-dashboard']);
        }else{
          this.router.navigate(['login']);
        }
    }
   }

  ngOnInit() {
  }


}
