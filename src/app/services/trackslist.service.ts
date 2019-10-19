import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NbAuthService} from "@nebular/auth";
import {server} from "../config";

@Injectable({
  providedIn: 'root'
})
export class TrackslistService {

  private token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });

  }

  gettrackslist() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/trackslist/', httpOptions);
  }

  gettrack(trackid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/gettrack/' + trackid, httpOptions);
  }

  updatetrack(trackid, params) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.put(server + '/gettrack/' + trackid, params, httpOptions);
  }

  deletetrack(trackid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.delete(server + '/gettrack/' + trackid, httpOptions);
  }

  buildtrack(trackid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/buildtrack/' + trackid, httpOptions);
  }

  runtrack(trackid, courseid, studentid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    if (trackid && courseid && studentid) {
      return this.http.get(server + '/runtrack/' + trackid + '/' + courseid + '/' + studentid, httpOptions);
    } else if (trackid && courseid) {
      return this.http.get(server + '/runtrack/' + trackid + '/' + courseid, httpOptions);
    } else {
      return this.http.get(server + '/runtrack/' + trackid, httpOptions);
    }
  }

  keepcontaineralive(containerid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/keepcontaineralive/' + containerid, httpOptions);
  }
}
