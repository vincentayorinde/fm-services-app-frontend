import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router: Router) {

  }
  backToLogin(){
    this.router.navigate(['login']);
  }
  
  logout(){
    localStorage.clear();
    setTimeout(() => this.backToLogin(), -1000);
  }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.logout();  
  }

}
