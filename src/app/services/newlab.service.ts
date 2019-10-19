import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NbAuthService} from "@nebular/auth";
import {server} from "../config";

@Injectable({
  providedIn: 'root'
})
export class NewlabService {
  private token: string;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });


  }
  savelab(params) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),
    };
    console.log(this.token)
    const body: string = JSON.stringify(params);
    return this.http.post(server + '/newlab/', body, httpOptions);
  }
}
