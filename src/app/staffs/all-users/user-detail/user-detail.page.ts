import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../services/users.service";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.page.html",
  styleUrls: ["./user-detail.page.scss"]
})
export class UserDetailPage implements OnInit {
  userId: any;
  public singleUserData;
  public updatedUserData: any;
  public data;
  username: any;
  email: any;
  name: any;
  role: any;
  date_joined: any;
  isSuspended: boolean;
  isDeleted: any;

  constructor(
    public usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController
  ) {
    this.getUser();
  }
  // async clearSingleUser() {
  //   await localStorage.removeItem("singleUserData");
  //   this.getUser();
  // }

  getUserID() {
    this.userId = this.route.snapshot.paramMap.get("user-detail");
    return this.userId;
  }

  async getUser() {
    await this.usersService.getSingleUser(this.getUserID()).subscribe(
      result => {
        this.singleUserData = result[0];
        localStorage.setItem(
          "singleUserData",
          JSON.stringify(this.singleUserData)
        );
        this.data = localStorage.getItem("singleUserData");
        this.data = JSON.parse(this.data);
        if (this.data.isSuspended === "1") {
          this.isSuspended = true;
        }
        if (this.data.isSuspended === "0") {
          this.isSuspended = false;
        }
        this.username = this.data.username;
        this.email = this.data.email;
        this.name = this.data.name;
        this.role = this.data.role;
        this.date_joined = this.data.date_joined;
        this.isDeleted = this.data.isDeleted;
        console.log(this.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateUser() {
    // if (this.isSuspended === false) this.isSuspended = 0;
    // else this.isSuspended = 1;
    let updateData = {
      username: this.username,
      email: this.email,
      name: this.name,
      role: this.role,
      isSuspended: this.isSuspended,
      isDeleted: this.isDeleted
    };
    console.log(this.userId);
    console.log(updateData);
    this.usersService.updateUser(this.getUserID(), updateData).subscribe(
      result => {
        this.updatedUserData = result;
        this.router.navigate(["staffs", "staff-dashboard"]);
        this.presentAlert("User updated successfully!");
      },
      err => {
        console.log(err);
      }
    );
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: "Great!",
      message: msg,
      buttons: [
        {
          text: "Okay",
          handler: () => {
            console.log("Okay");
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnInit() {}
}
