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
  getpublictracks() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/publictrackslist/', httpOptions);
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
  copytrack(trackid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/copytrack/' + trackid, httpOptions);
  }

  runtrack(trackid, courseid, studentid, instructor) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    if (trackid && courseid && studentid && instructor) {
      return this.http.get(server + '/runtrack/' +
        trackid + '/' + courseid + '/' + studentid + '?instructor=true', httpOptions);
    } else if (trackid && courseid && studentid) {
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

  submitlab(trackid, courseid, studentid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/submitlab/' + trackid + '/' + courseid + '/' + studentid, httpOptions);
  }

  snapshotcontainer(containerid, trackid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.get(server + '/snapshotcontainer/' + containerid + '/' + trackid, httpOptions);
  }
  updatechallenge(challengeid, params) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.put(server + '/getchallenge/' + challengeid, params, httpOptions);
  }
  deletechallenge(challengeid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.delete(server + '/getchallenge/' + challengeid, httpOptions);
  }
  submitnewchallenge(params) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token}),
    };
    return this.http.post(server + '/getchallenge', params, httpOptions);
  }
  uploadFile(trackid, formData, filename) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token
          }
        ),
      reportProgress: true
    };

    return this.http.post(server + '/fileupload/'+ trackid +'/'+filename, formData, httpOptions)
  }
  deletetrackfolder(trackid) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token,
         }),
    };

    return this.http.delete(server + '/fileupload/'+ trackid, httpOptions)
  }
  startiframe(containerid, port) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.token,
      }),
    };
    return this.http.get(server + '/startiframe/' + containerid + '/' + port, httpOptions)
  }
}
