import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.page.html',
  styleUrls: ['./staff-dashboard.page.scss'],
})
export class StaffDashboardPage implements OnInit {
  public userDetails: any;
  currentUser: any;

  constructor(private router: Router) {
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
