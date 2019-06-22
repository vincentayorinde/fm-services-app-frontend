import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public userDetails: any;
  message: string = '';
  s;

  constructor() {
    // const data = JSON.parse(localStorage.getItem('userData'));
    // this.userDetails = data.userData;
    // // this.message = this.navParams.get('message')
    // this.s = this.db.collection('/chat').add(data => {
    //   console.log(data);
    // });
   }

  sendMessage(){
    // this.db.collection('/chat').add({
    //   username: this.userDetails.username,
    //   message: this.message
    // }).then( () => {
    //   // message is sent
    // }).catch( () => {
    //   // some errors
    // })
  }

  ngOnInit() {
  }

}
