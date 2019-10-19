import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NbAuthService} from "@nebular/auth";
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
    console.log(this.token)
    const body: string = JSON.stringify(profile);
    return this.http.post(LMS + '/youngspheresite/api/school/', body, httpOptions);
  }
  update(profile) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'JWT '+ this.token }),

    };
    console.log(this.token)
    const body: string = JSON.stringify(profile);
    return this.http.put(LMS + '/youngspheresite/api/school/'+profile.id+'/', body, httpOptions);
  }

  getschool(username) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(LMS + '/youngspheresite/api/schoolprofile/' + username + '/');
  }
}
