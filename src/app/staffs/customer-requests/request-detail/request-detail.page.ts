import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestService } from "../../../services/request.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-request-detail",
  templateUrl: "./request-detail.page.html",
  styleUrls: ["./request-detail.page.scss"]
})
export class RequestDetailPage implements OnInit {
  userName: any;
  requestId: any;
  public singleRequestData: any;
  public updateRequestStatus: any;
  public endRequestStatus: any;
  public userDetails: any;

  constructor(
    public requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.getRequest();
    this.getRequestID();
    this.getRequestForBillID();
  }

  getRequestID() {
    this.requestId = this.route.snapshot.paramMap.get("request-detail");
    return this.requestId;
  }
  getRequestForBillID() {
    this.requestId = this.route.snapshot.paramMap.get(
      "create-bill/create-bill"
    );
    return this.requestId;
  }

  getUserName() {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userName = data.userData.name;
    return this.userName;
  }

  getRequest() {
    this.requestService.getSingleRequest(this.getRequestID()).subscribe(
      result => {
        console.log(result);
        this.singleRequestData = result[0];
      },
      err => {
        console.log(err);
      }
    );
  }

  updateData = {
    served_by: this.getUserName(),
    status: "On Going"
  };
  endData = {
    status: "Completed"
  };

  startJob() {
    console.log(this.updateData);
    this.requestService
      .updateRequestStatus(this.getRequestID(), this.updateData)
      .subscribe(
        result => {
          this.router.navigate(["staffs", "staff-dashboard"]);
          this.presentAlert("Job started successfully!");
        },
        err => {
          console.log(err);
        }
      );
  }
  endJob() {
    console.log(this.endData);
    this.requestService
      .endRequestStatus(this.getRequestID(), this.endData)
      .subscribe(
        result => {
          this.router.navigate(["staffs", "staff-dashboard"]);
          this.presentAlert("Job Completed!");
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
  generateBill() {}

  ngOnInit() {}
}
