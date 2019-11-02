import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NbAuthService} from "@nebular/auth";
import {server} from "../config";
const LMS = null;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });


  }
  save(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    const body: string = JSON.stringify(profile);
    return this.http.post(server + '/auth/userprofile/', body, httpOptions);
  }
  update(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    const body: string = JSON.stringify(profile);
    return this.http.put(server + '/auth/userprofile/' + profile.user + '/', body, httpOptions);
  }

  getuserprofile() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    return this.http.get(server + '/auth/getuserprofile', httpOptions);
  }
}
