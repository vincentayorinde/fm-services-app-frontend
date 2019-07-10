import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

let apiURL = "https://ezybuygh.com/fm-s/public/index.php/api/auth/";

@Injectable({
  providedIn: "root"
})
export class AuthServiceService {
  constructor(public http: Http) {}

  postData(credentials, type) {
    let headerType = "application/json; charset=UTF-8";
    let headers = new Headers({ "Content-Type": headerType });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(apiURL + type, JSON.stringify(credentials), options)
      .pipe(map(res => res.json()));
  }
}
