import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { BillService } from '../../services/bill.service';
import { RequestService } from '../../services/request.service';


@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.page.html',
  styleUrls: ['./create-bill.page.scss'],
})
export class CreateBillPage implements OnInit {
  public itemFormData: any;
  public form: FormGroup;
  userName: any;
  public billData : any;
  requestId: any;
  public singleRequestData: any;
  customDayShortNames;
  controls;

  constructor(
    public requestService: RequestService,
    public alertController: AlertController,
    private toastController: ToastController,
    public billService: BillService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { 
   this.form = this.formBuilder.group({
        due_date: ['', Validators.required],
        billItems: this.formBuilder.array([
          this.initItemFields()
        ])
    });
    this.getRequestUserId();

  }

  initItemFields() : FormGroup
    {
      return this.formBuilder.group({
          name : ['', Validators.required],
          qty : ['', Validators.required],
          price : ['', Validators.required]
      });
    }

    addNewInputField() : void
      {
        const control = <FormArray>this.form.controls.billItems;
        control.push(this.initItemFields());
      }
     removeInputField(i : number) : void
      {
         const control = <FormArray>this.form.controls.billItems;
         control.removeAt(i);
      }
      getRequestUserId(){
        this.requestService.getSingleRequest(this.getRequestID()).subscribe((result) => {
          return this.singleRequestData = result[0];

        }, (err) => {
          console.log(err);
        })
      }
      
    
    
   

    previewBill(val){

      let sub_total = [];
      let totals = 0;
      for(let i=0; i < val.billItems.length; i++){
        sub_total.push(val.billItems[i].qty * val.billItems[i].price);
        totals += val.billItems[i].qty * val.billItems[i].price;
        }
        localStorage.setItem('sub_total', JSON.stringify(sub_total));          
      
        this.itemFormData = {
          "billItems": val,
          "service_type": this.singleRequestData.service_type,
          "generated_at": "",
          "amount": totals,
          "due_date": val.due_date,
          "user_id": this.singleRequestData.user_id,
          "user_name": this.singleRequestData.user_name,
          "user_email": this.singleRequestData.user_email,
          "request_id": this.getRequestID(),
          "served_by": this.getAdminUserName()
        }

      delete this.itemFormData.billItems.due_date;
      localStorage.setItem('billData', JSON.stringify(this.itemFormData));
      this.router.navigate(['staffs', 'preview-bill']);

  }
  getRequestID(){
    this.requestId = this.route.snapshot.paramMap.get('create-bill');
    return this.requestId;
  }

  


  getAdminUserName(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userName = data.userData.name;
    return this.userName;
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
          }
        }
      ]
    });

    await alert.present();
  }

  
  ngOnInit() {
  }

}
