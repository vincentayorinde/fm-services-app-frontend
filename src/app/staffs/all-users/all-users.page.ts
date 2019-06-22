import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.page.html",
  styleUrls: ["./all-users.page.scss"]
})
export class AllUsersPage implements OnInit {
  public AllUsers: any;

  constructor(public usersService: UsersService) {
    this.getAllUsers();
    // localStorage.removeItem("singleUserData");
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(
      result => {
        console.log(result);
        this.AllUsers = result;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
