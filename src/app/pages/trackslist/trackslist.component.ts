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
  mytracks = []
  constructor(private themeService: NbThemeService, private trackslistservice: TrackslistService) {
    this.trackslistservice.gettrackslist().subscribe((result: any) => {
      this.mytracks = result.user_tracks;
    })
  }

  ngOnDestroy() {
  }
}
