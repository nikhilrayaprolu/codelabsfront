import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TrackslistService} from "../../services/trackslist.service";



@Component({
  selector: 'ngx-labrun',
  styleUrls: ['./trackslist.component.scss'],
  templateUrl: './trackslist.component.html',
})
export class TrackslistComponent implements OnDestroy {
  mytracks = [];
  showpublictrack = false;
  constructor(private themeService: NbThemeService, private trackslistservice: TrackslistService) {
    this.trackslistservice.gettrackslist().subscribe((result: any) => {
      this.mytracks = result.user_tracks;
    })
  }
  changetracks() {
    console.log(event);
    if (this.showpublictrack) {
      this.trackslistservice.getpublictracks().subscribe((result: any) => {
        this.mytracks = result.public_tracks;
      })
    } else {
      this.trackslistservice.gettrackslist().subscribe((result: any) => {
        this.mytracks = result.user_tracks;
      })
    }

  }

  ngOnDestroy() {
  }
}
