import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {server} from '../config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body: string = JSON.stringify(user);
    return this.http.post(server + '/api/register', body, httpOptions);
  }
  register_site(user_email, site) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body: string = JSON.stringify({"site": {"name":site.name,"domain":site.subdomain},
      "organization": {"name":site.name,"short_name":site.name},
      "initial_values": {"font":"Roboto","platform_name":"afds site","primary_brand_color":"#F00","base_text_color":"#000","cta_button_bg":"#00F"},
      "user_email":user_email
    });
    return this.http.post(server + '/register_site/', body, httpOptions);
  }

}
