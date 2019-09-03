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
   }

  sendMessage(){
  }

  ngOnInit() {
  }

}
