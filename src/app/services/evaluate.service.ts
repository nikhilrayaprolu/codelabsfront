import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NbAuthService} from "@nebular/auth";
import {server} from "../config";

@Injectable({
  providedIn: 'root'
})
export class EvaluateService {

  private token: string;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((token) => {

        this.token = token.getValue()
      });

  }
  getcourses() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/evaluate/', httpOptions);
  }
  getcourseview(courseid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/evaluatecourse/'+courseid, httpOptions);
  }
  getcoursetrack(courseid, trackid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/evaluatecoursetrack/'+ courseid + '/' +trackid, httpOptions);
  }
  gradesubmission(submissionid, grade) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/gradesubmissions/' + submissionid + '/' + grade, httpOptions);
  }

}
