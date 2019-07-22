import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

let apiURL_prod = "https://ezybuygh.com/fm-s/public/index.php/api/requests";
let apiURL = "http://192.168.64.2/fm-services-api/public/index.php/api/requests";

@Injectable({
  providedIn: "root"
})
export class RequestService {
  constructor(public http: Http) {}
  setHeaders() {
    let headerType = "application/json; charset=UTF-8";
    let headers = new Headers({ "Content-Type": headerType });
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  // Create request
  postRequest(requestValues) {
    let postOptions = this.setHeaders();
    return this.http
      .post(apiURL, JSON.stringify(requestValues), postOptions)
      .pipe(map(res => res.json()));
  }

  //  Get user requests
  getRequests(userId) {
    return this.http.get(apiURL + "/" + userId).pipe(map(res => res.json()));
  }

  // Get single request
  getSingleRequest(requestId) {
    return this.http
      .get(apiURL + "/user/" + requestId)
      .pipe(map(res => res.json()));
  }

  // Get single request bill
  getSingleRequestBill(requestId) {
    return this.http
      .get(apiURL + "/bill/" + requestId)
      .pipe(map(res => res.json()));
  }

  // Get all requests for admin
  getGeneralRequestsForAdmin(adminId) {
    return this.http
      .get(apiURL + "/admin/" + adminId)
      .pipe(map(res => res.json()));
  }

  // State a request
  updateRequestStatus(requestId, stateValues) {
    let updateOptions = this.setHeaders();
    return this.http.put(
      apiURL + "/update/start/" + requestId,
      JSON.stringify(stateValues),
      updateOptions
    );
  }

  // Complete a request
  endRequestStatus(requestId, endValues) {
    let endOptions = this.setHeaders();
    return this.http.put(
      apiURL + "/update/end/" + requestId,
      JSON.stringify(endValues),
      endOptions
    );
  }
}
