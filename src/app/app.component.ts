import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthServiceService } from './services/auth-service.service'
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  currentUser: any;
  
  public appPages = [
  
    {
      title: 'Payment Instruction',
      url: '/instruction',
      icon: 'cash'
    },
    {
      title: 'About FMApp',
      children: [
        {
          title: 'Introduction',
          url: '/introduction',
          icon: 'alert'
        },
        {
          title: 'Our Services',
          url: '/services',
          icon: 'logo-buffer'
        },
        {
          title: 'Working Areas',
          url: '/working-areas',
          icon: 'build'
        },
        {
          title: 'Why Choose Us?',
          url: '/why-us',
          icon: 'bulb'
        }
      ]
    },
    {
      title: 'Contact us',
      url: '/contact',
      icon: 'call'
    },
    {
      title: 'Log out',
      icon: 'log-out',
      url: '/logout'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private AuthServiceService: AuthServiceService,
    private router: Router,
    public network: Network,
    private toastController: ToastController
  ) {
    this.initializeApp();
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
    this.network.onDisconnect().subscribe(() => {
      this.presentToast("Network is disconnected", "light"); 
    });
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        this.presentToast("Network is connected", "success");        
      }, 2000)
    });
  }

  async presentToast(msg, status) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: "top",
      color: status
    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
}
