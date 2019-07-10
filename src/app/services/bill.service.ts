import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

let apiURL = "https://ezybuygh.com/fm-s/public/index.php/api/bills";

@Injectable({
  providedIn: "root"
})
export class BillService {
  constructor(public http: Http) {}
  setHeaders() {
    let headerType = "application/json; charset=UTF-8";
    let headers = new Headers({ "Content-Type": headerType });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  // Create request
  postBill(billValues) {
    let postOptions = this.setHeaders();
    return this.http
      .post(apiURL, JSON.stringify(billValues), postOptions)
      .pipe(map(res => res.json()));
  }

  //  Get user bills
  getBills(userId) {
    return this.http.get(apiURL + "/" + userId).pipe(map(res => res.json()));
  }

  // Get single request
  getSingleBill(billId) {
    return this.http
      .get(apiURL + "/user/" + billId)
      .pipe(map(res => res.json()));
  }

  //  Get user bills
  getAllBills() {
    return this.http.get(apiURL).pipe(map(res => res.json()));
  }
}
