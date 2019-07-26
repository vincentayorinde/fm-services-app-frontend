import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { LoadingController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.page.html",
  styleUrls: ["./all-users.page.scss"]
})
export class AllUsersPage implements OnInit {
  public AllUsers: any;
  public noData: any;
  toSearch = '';
  loader;
  constructor(public usersService: UsersService, public loadingController :LoadingController,
    private toastController: ToastController) {
    this.getAllUsers();
  }
  getAllUsers() {
    this.usersService.getAllUsers().subscribe((result) => {
      if(result){
        this.AllUsers = result;
      }else{
         this.noData = {"message":"No data yet"};
      }
    }, (err) => {
      this.presentToast("Connection error, Please check internet", "dark");
    })
  }
  search(event){
    this.toSearch = event.detail.value;
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
  ngOnInit() {}
}
