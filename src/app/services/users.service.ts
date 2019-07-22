import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

let apiURL_prod = "https://ezybuygh.com/fm-s/public/index.php/api/users";
let apiURL = "http://192.168.64.2/fm-services-api/public/index.php/api/users";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(public http: Http) {}
  setHeaders() {
    let headerType = {'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' };
    let headers = new Headers({ "Content-Type": headerType });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  // Get single request bill
  getAllUsers() {
    return this.http.get(apiURL).pipe(map(res => res.json()));
  }

  // Get single request bill
  getSingleUser(userId) {
    return this.http
      .get(apiURL + "/user/" + userId)
      .pipe(map(res => res.json()));
  }

  // update user
  updateUser(userId, updateValues) {
    let updateOptions = this.setHeaders();
    return this.http
      .put(
        apiURL + "/update/" + userId,
        JSON.stringify(updateValues),
        updateOptions
      )
      .pipe(map(res => res.json()));
  }
}
