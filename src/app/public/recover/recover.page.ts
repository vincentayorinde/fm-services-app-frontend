import { Component, OnInit } from "@angular/core";
import Email from "../../services/smtp.js";
@Component({
  selector: "app-recover",
  templateUrl: "./recover.page.html",
  styleUrls: ["./recover.page.scss"]
})
export class RecoverPage implements OnInit {
  constructor(public email: Email) {
    console.log(email);
  }

  ngOnInit() {}
}
