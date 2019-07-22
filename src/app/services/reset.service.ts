import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

let apiURL = "https://ezybuygh.com/fm-s/public/index.php/api/auth/";
let apiURL_dev = "http://localhost:8082/fm-services-api/public/index.php/api/auth/";

@Injectable({
  providedIn: "root"
})
export class ResetService {
  constructor(public http: Http) {}

  putData(credentials, type) {
    let headerType = "application/json; charset=UTF-8";
    let headers = new Headers({ "Content-Type": headerType });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .put(apiURL + type, JSON.stringify(credentials), options)
      .pipe(map(res => res.json()));
  }
}
