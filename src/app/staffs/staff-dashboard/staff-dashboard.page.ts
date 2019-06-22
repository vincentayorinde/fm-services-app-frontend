import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.page.html',
  styleUrls: ['./staff-dashboard.page.scss'],
})
export class StaffDashboardPage implements OnInit {
  public userDetails: any;

  constructor() {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
   }

  ngOnInit() {
  }

}
