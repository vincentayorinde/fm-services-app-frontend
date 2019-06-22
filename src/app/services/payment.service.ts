import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

let apiURL = "http://localhost/fm-services-api/public/index.php/api/payments";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  constructor(public http: Http) {}
  setHeaders() {
    let headerType = "application/json; charset=UTF-8";
    let headers = new Headers({ "Content-Type": headerType });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  // Create request
  postPayment(paymentValues) {
    console.log(paymentValues, "Payment Values");
    let postOptions = this.setHeaders();
    return this.http
      .post(apiURL, JSON.stringify(paymentValues), postOptions)
      .pipe(map(res => res.json()));
  }

  //  Get user bills
  getPayments(userId) {
    return this.http.get(apiURL + "/" + userId).pipe(map(res => res.json()));
  }

  // Get single request
  getSinglePayment(billId) {
    return this.http
      .get(apiURL + "/user/" + billId)
      .pipe(map(res => res.json()));
  }

  //  Get user bills
  getAllPayments() {
    return this.http.get(apiURL).pipe(map(res => res.json()));
  }
  // updatePayment
  confirmPayment(paymentId, updateValue) {
    let updateOptions = this.setHeaders();
    return this.http.put(
      apiURL + /update/ + paymentId,
      JSON.stringify(updateValue),
      updateOptions
    );
  }
}
