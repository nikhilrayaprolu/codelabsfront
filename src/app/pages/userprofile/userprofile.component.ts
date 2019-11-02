import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TrackslistService} from "../../services/trackslist.service";
import {ProfileService} from "../../services/profile.service";
import {NbAuthService} from "@nebular/auth";



@Component({
  selector: 'ngx-userprofile',
  styleUrls: ['./userprofile.component.scss'],
  templateUrl: './userprofile.component.html',
})
export class UserprofileComponent implements OnDestroy {
  new_profile = true;
  profile = {
    user: '',
    first_name: '',
    last_name: '',
    alloted_institute_code: '',
    gender: '',
    email: '',
    contact_number: '',
    is_staff: true
  };
  constructor(private themeService: NbThemeService, private profileservice: ProfileService,
              private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token) => {
        if (token.isValid()) {
            this.profileservice.getuserprofile().subscribe((result: any) => {
              if (result.user) {
                this.profile = result;
                this.new_profile = false;
              } else {
                this.profile.user = token.getPayload().user_id;
              }
            })
          }

      });
  }
  onprofilesave() {
    if (this.new_profile) {
      this.profileservice.save(this.profile).subscribe((result: any) => {
        console.log(result);
      })
    } else {
      this.profileservice.update(this.profile).subscribe((result: any) => {
        console.log(result);
      })
    }
  }
  ngOnDestroy() {
  }
}
