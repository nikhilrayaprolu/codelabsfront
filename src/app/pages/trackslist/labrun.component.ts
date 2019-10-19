import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NewlabService} from "../../services/newlab.service";


@Component({
  selector: 'ngx-labrun',
  styleUrls: ['./labrun.component.scss'],
  templateUrl: './labrun.component.html',
})
export class LabrunComponent implements OnDestroy {
  public Editor = ClassicEditor;
  monacoeditor = {theme: 'vs-dark', language: 'shell'};
  monacocode: string = '';
  profile: any = {};
  tracks = [];
  newlab = {
    topic: '',
    tags: '',
    timelimit: {hour: 13, minute: 30},
    tracks: this.tracks
  };
  newtrack = {
    title: '',
    description: '',
    image: '',
    container: '',
    installscript: '',
    configscript: '',
    scenario: '',
    challenges: []
  };
  newchallenge = {
    title: '',
    notes: '',
    setupscript: '',
    checkscript: '',
    cleanscript: '',
  };
  constructor(private themeService: NbThemeService, private newlabservice: NewlabService) {
  }
  cloneobject(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  addNewTrack() {
    this.tracks.push(this.cloneobject(this.newtrack));
  }
  addNewChallenge(track) {
    track.challenges.push(this.cloneobject(this.newchallenge));
  }
  removeNewChallenge(track) {
    track.challenges.pop()
  }
  removeNewTrack() {
    this.tracks.pop()
  }
  saveimageconfig() {
    this.newlabservice.savelab(this.newlab).subscribe((result: any) => {
      console.log(result);
    })
  }
  saveandbuildimage() {

  }

  ngOnDestroy() {
  }
}
