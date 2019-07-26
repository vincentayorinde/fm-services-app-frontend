import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { RequestService } from '../../../services/request.service';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'app-preview-bill',
  templateUrl: './preview-bill.page.html',
  styleUrls: ['./preview-bill.page.scss'],
})
export class PreviewBillPage implements OnInit {
  requestId: any;
  public subtotal: any;
  public billData : any;
  singleRequestData: any;

  constructor(public billService: BillService, public requestService: RequestService, private route: ActivatedRoute, private router: Router,  public alertController: AlertController, private toastController: ToastController,) {
    
    const sub_total = JSON.parse(localStorage.getItem('sub_total'));
    this.subtotal = sub_total;
    this.getRequest();

  }
  
  ngOnInit() {
  }
  getRequest(){
    this.billData = JSON.parse(localStorage.getItem('billData'));
    this.requestService.getSingleRequest(this.billData.request_id).subscribe((result) => {
      this.singleRequestData = result[0];
    }, (err) => {
      console.log(err);
    })
  }

   sendToCustomer() {
    if(this.billData){
      this.billData = JSON.parse(localStorage.getItem('billData'));

        console.log('the bill data', this.billData);
         this.billService.postBill(this.billData).subscribe((result) => {

          this.billData = result;
          if(this.billData){
            console.log(this.billData)  
            this.router.navigate(['staffs','staff-dashboard']);
            this.presentAlert("Bill sent, You can call customer to confirm");
          }
          else{
            this.presentToast("Please give valid item data", "dark");
          }
      }, (err) => {
            console.log(err);
            this.presentToast("Please check the data provided", "dark");
      });
      }
      else {
        this.presentToast("Please give valid item data before", "dark");
      }
  }

  async presentToast(msg, status) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: 'top',
      color: status
    }); 
    toast.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Great!',
      message: msg,
      buttons: [
         {
          text: 'Okay',
          handler: () => {
            console.log('Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
